import {Component, h, Host} from '@stencil/core';

@Component({
  tag: 'pe-not-found-page',
  styleUrl: 'not-found-page.scss',
  shadow: true,
})
export class NotFoundPage {

  render() {
    return (
      <Host>
        <p>Nicht gefunden</p>
      </Host>
    );
  }
}
