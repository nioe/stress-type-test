import {Component, Element, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'pe-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {

  @Prop()
  public titleText?: string;

  @Element()
  private host: HTMLPeCardElement;

  render() {
    return (
      <Host>
        {this.titleText && <h1 class="title">{this.titleText}</h1>}

        <slot/>

        {this.hasActions() && (
          <div class="action-bar">
            <slot name="action"/>
          </div>
        )}
      </Host>
    );
  }

  private hasActions = () => !!this.host.querySelector('[slot="action"]');
}
