import {Component, Event, EventEmitter, Fragment, h, Host, Prop} from '@stencil/core';
import {Statement, StressType, StressTypeResult} from "../../../data/stress-type.interface";
import {RouterHistory} from "@stencil/router";
import {appRoot} from "../../../global/constants";

@Component({
  tag: 'pe-stress-type-result-page',
  styleUrl: 'stress-type-result-page.scss',
  shadow: true,
})
export class StressTypeResultPage {

  @Prop()
  public history: RouterHistory;

  @Prop()
  public ratedStatements: Array<Statement>;

  @Event()
  public resetState: EventEmitter

  private completeResult: StressTypeResult;
  private stressTypeResult: StressType | Array<StressType>;

  componentWillRender() {
    // TODO Move to app-root and generalize
    if (!this.ratedStatements.every(statement => statement.rating >= 0 && statement.rating <= 3)) {
      console.log('Not every statment has been rated. Going back to first unrated statement...');
      this.history.replace(`/${appRoot}/${this.ratedStatements.findIndex(statement => !(statement.rating >= 0 && statement.rating <= 3))}`);
    }

    this.completeResult = this.ratedStatements.reduce(
      (result, statement) => Object.assign(result, {[statement.stressType]: result[statement.stressType] + statement.rating}),
      {
        [StressType.PERFEKTIONIST]: 0,
        [StressType.LIEBLINGSMENSCH]: 0,
        [StressType.SELBSTZWEIFLER]: 0,
        [StressType.SUPERHELD]: 0,
        [StressType.BODYGUARD]: 0,
        [StressType.SPRINTER]: 0,
      } as StressTypeResult
    );

    const maxRating = Object.values(this.completeResult).reduce((max, current) => Math.max(max, current), 0);
    const stressTypes = Object.entries(this.completeResult).filter(([_, rating]) => rating === maxRating).map(([stressTyp]) => stressTyp) as Array<StressType>;
    this.stressTypeResult = stressTypes.length === 1 ? stressTypes[0] : stressTypes;
  }

  render() {
    return (
      <Host>
        <pe-card>
          {Array.isArray(this.stressTypeResult) ? (
            <Fragment>
              <h1>Hallo Mischtyp!</h1>
              <p>Die Typen {this.stressTypeResult.map(this.getStressTypeName).join(', ').replace(/,(?!.*,)/, ' &')} sind
                bei dir gleich stark ausgeprägt.</p>
            </Fragment>
          ) : (
            <h1>Hallo {this.getStressTypeName(this.stressTypeResult)}!</h1>
          )}

          <pe-button slot="action" onClick={this.handleResetClick}>Nochmals ausfüllen</pe-button>
        </pe-card>
      </Host>
    );
  }

  private getStressTypeName = (stressType: StressType) => {
    switch (stressType) {
      case StressType.BODYGUARD:
        return 'Bodyguard';
      case StressType.LIEBLINGSMENSCH:
        return 'Lieblingsmensch';
      case StressType.PERFEKTIONIST:
        return 'Perfektionist';
      case StressType.SELBSTZWEIFLER:
        return 'Selbstzweifler';
      case StressType.SPRINTER:
        return 'Sprinter';
      case StressType.SUPERHELD:
        return 'Superheld';
    }
  }

  private handleResetClick = () => this.resetState.emit();
}
