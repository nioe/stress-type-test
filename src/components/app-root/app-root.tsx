import {Component, forceUpdate, h, Host, Listen, Prop} from '@stencil/core';
import {appRoot} from "../../global/constants";
import {Statement} from "../../data/stress-type.interface";
import {RatingClickEvent} from "../pages/statement-evaluation-page/statement-evaluation-page.interface";
import {
  getCurrentStatementIndex,
  getOrCreateRandomlyOrderedStatements,
  LocalStorageKey,
  resetLocalStorage,
  storeInLocalStorage
} from "../../util/local-storage.util";
import {injectHistory, RouterHistory} from "@stencil/router";


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {

  @Prop()
  public history: RouterHistory;

  private randomlyOrderedStatements: Array<Statement>;
  private currentStatementIndex: number;

  constructor() {
    this.initState();
  }

  @Listen('ratingClick')
  handleRatingClick(event: CustomEvent<RatingClickEvent>) {
    this.randomlyOrderedStatements[this.currentStatementIndex].rating = event.detail.rating;
    storeInLocalStorage(LocalStorageKey.STATEMENTS, this.randomlyOrderedStatements);

    if (this.currentStatementIndex < this.randomlyOrderedStatements.length - 1) {
      this.currentStatementIndex++;
      this.goToStatement(this.currentStatementIndex);
    } else {
      this.goToResult();
    }
  }

  @Listen('resetState')
  reset() {
    resetLocalStorage();
    this.initState();
    this.goToWelcome();

    // Update routes since the questions get reordered
    setTimeout(() => forceUpdate(this), 200);
  }

  render() {
    return (
      <Host>
        <header>
          <h1>Stresstyp Test | PfotenEffekt.com</h1>
        </header>

        <main>
          <div class="content-container">
            <stencil-router root={`/${appRoot}/`}>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route url="/" component="pe-welcome-page" exact={true}/>

                {this.randomlyOrderedStatements.map((statement, index) => (
                  <stencil-route
                    url={`/${index}`}
                    component="pe-statement-evaluation-page"
                    componentProps={{statement}}
                    exact={true}
                  />
                ))}

                <stencil-route
                  url="/result"
                  component="pe-stress-type-result-page"
                  componentProps={{ratedStatements: this.randomlyOrderedStatements}}
                  exact={true}
                />

                <stencil-route component="pe-not-found-page"/>
              </stencil-route-switch>
            </stencil-router>
          </div>
        </main>
      </Host>
    );
  }

  private initState = () => {
    this.currentStatementIndex = getCurrentStatementIndex();
    this.randomlyOrderedStatements = getOrCreateRandomlyOrderedStatements();
  }

  // private isWelcomePage = () => !!this.history.location.pathname.match(new RegExp(`^\/${appRoot}[/]?$`));
  // private isStatementPage = statementIndex => !!this.history.location.pathname.match(new RegExp(`^\/${appRoot}\/${statementIndex}[/]?$`));

  private goToWelcome = () => this.history.push(`/${appRoot}/`);

  private goToStatement = (statementIndex, replace = false) => {
    const newRoute = `/${appRoot}/${statementIndex}`;
    replace ? this.history.replace(newRoute) : this.history.push(newRoute);
    storeInLocalStorage(LocalStorageKey.CURRENT_STATEMENT, statementIndex);
  };

  private goToResult = () => this.history.push(`/${appRoot}/result`);
}

injectHistory(AppRoot);
