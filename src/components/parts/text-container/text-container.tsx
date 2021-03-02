import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pe-text-container',
  styleUrl: 'text-container.scss',
  shadow: true,
})
export class TextContainer {

  render() {
    return (
      <Host>
        <slot/>
      </Host>
    );
  }
}
