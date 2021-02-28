import {Component, Event, EventEmitter, h, Host, Prop} from '@stencil/core';
import {Statement} from "../../../data/stress-type.interface";
import {RatingClickEvent} from "./statement-evaluation-page.interface";

@Component({
  tag: 'pe-statement-evaluation-page',
  styleUrl: 'statement-evaluation-page.scss',
  shadow: true,
})
export class StatementEvaluation {

  @Prop()
  public statement: Statement;

  @Event()
  public ratingClick: EventEmitter<RatingClickEvent>;

  render() {
    return (
      <Host>
        <div class="statement-container">{this.statement.text}</div>

        <div class="statement-rating-container">
          <div>Gar nicht vertaut</div>
          <div class="statement-rating">
            <div onClick={this.handleStatementRatingClick(0)}>0</div>
            <div onClick={this.handleStatementRatingClick(1)}>1</div>
            <div onClick={this.handleStatementRatingClick(2)}>2</div>
            <div onClick={this.handleStatementRatingClick(3)}>3</div>
          </div>
          <div>Sehr vertraut</div>
        </div>
      </Host>
    );
  }

  private handleStatementRatingClick = rating => () => this.ratingClick.emit({rating})
}
