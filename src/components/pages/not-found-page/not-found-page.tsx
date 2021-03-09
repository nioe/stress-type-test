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
        <pe-card titleText="Oh nein!">
          <div class="content-container">
            <p>Leider konnte die gesuchte Seite nicht gefunden werden.</p>
            <img src="assets/img/notFound.png" alt="not found"/>
          </div>

          <stencil-route-link
            url={`/`}
            activeClass="active"
            exact={true}
            custom="pe-button"
            slot="action"
          >
            Zurück zur Startseite
          </stencil-route-link>
        </pe-card>
      </Host>
    );
  }
}
