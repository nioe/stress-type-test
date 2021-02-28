import {Component, h, Host, Prop} from '@stencil/core';
import {RouterHistory} from "@stencil/router";

@Component({
  tag: 'pe-welcome-page',
  styleUrl: 'welcome-page.scss',
  shadow: true,
})
export class WelcomePage {

  @Prop()
  public history: RouterHistory;

  render() {
    return (
      <Host>
        <p>Willkommen</p>

        <stencil-route-link
          url={`/0`}
          activeClass="active"
          exact={true}
        >
          Start
        </stencil-route-link>
      </Host>
    );
  }
}
