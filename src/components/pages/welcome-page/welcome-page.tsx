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
        <pe-card>
          <pe-text-container>
            <p class="bold">Herzlich willkommen auf dem Stresstyp-Test von PfotenEffekt.com</p>
            <p>Auf den folgenden Seiten werden dir Aussagen angezeigt welche typisch für bestimmte Stresssituationen
            und den Umgang damit sind. Bitte bewerte die Sätze jeweils mit 0 bis 3, wobei 0 bedeutet, dass die Aussage
            überhaupt nicht zutrifft. Bewertest Du die Frage mit 3 heisst das, dass die Aussage voll und ganz auf
            dich zutrifft.</p>
            <p>Anhand diner Angaben berechnet die Seite automatisch deinen persönlichen Stresstypen.</p>
            <p>Viel Spass!</p>
          </pe-text-container>

          <stencil-route-link
            url={`/0`}
            activeClass="active"
            exact={true}
            custom="pe-button"
            slot="action"
          >
            Test ausfüllen
          </stencil-route-link>
        </pe-card>
      </Host>
    );
  }
}
