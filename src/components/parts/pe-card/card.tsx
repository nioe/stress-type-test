import {Component, Element, h, Host} from '@stencil/core';

@Component({
  tag: 'pe-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {

  @Element()
  private host: HTMLPeCardElement;

  render() {
    return (
      <Host>
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
