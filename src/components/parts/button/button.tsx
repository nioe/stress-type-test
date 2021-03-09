import {Component, h, Host} from '@stencil/core';

@Component({
  tag: 'pe-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {

  render() {
    return (
      <Host>
        <slot/>
      </Host>
    );
  }
}
