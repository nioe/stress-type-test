import {Component, ComponentInterface, forceUpdate, h, Host, Listen, Prop} from '@stencil/core';
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
export class AppRoot implements ComponentInterface {

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

  componentWillLoad() {
    if (this.randomlyOrderedStatements.every(statement => statement.rating >= 0 && statement.rating <= 3)) {
      console.log('Every statement has been rated. Going to result page...');
      this.goToResult();
    } else if (this.randomlyOrderedStatements.some(statement => statement.rating >= 0 && statement.rating <= 3)) {
      const nextStatementIndex = this.randomlyOrderedStatements.findIndex(statement => !(statement.rating >= 0 && statement.rating <= 3));
      console.log(`Test has already been started. Going to back to statement ${nextStatementIndex}...`);
      this.goToStatement(nextStatementIndex, true);
    }
  }

  render() {
    return (
      <Host>
        <main>
          <pe-logo/>

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

  private goToWelcome = () => this.history.push(`/${appRoot}/`);

  private goToStatement = (statementIndex, replace = false) => {
    const newRoute = `/${appRoot}/${statementIndex}`;
    replace ? this.history.replace(newRoute) : this.history.push(newRoute);
    storeInLocalStorage(LocalStorageKey.CURRENT_STATEMENT, statementIndex);
  };

  private goToResult = () => this.history.push(`/${appRoot}/result`);
}

injectHistory(AppRoot);
