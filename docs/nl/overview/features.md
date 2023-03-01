---
description: Welkom bij het functieoverzicht van de Homey Android TV-app!
---

# Functies

Deze app is ontwikkeld om uw Android TV in het smart home-ecosysteem van Homey te integreren. Met deze app kunt u uw TV
bedienen, automatiseren en zelfs gebeurtenissen in uw huis activeren.

Op deze pagina vindt u een gedetailleerd overzicht van alle functies die momenteel worden aangeboden door de Homey
Android TV-app en hoe u ze kunt gebruiken om een slim en verbonden huis te creëren. Of u nu uw TV automatisch aan en uit
wilt zetten, het volume wilt aanpassen op basis van het tijdstip van de dag of het kanaal wilt veranderen op basis van
uw stemming, de Homey Android TV-app heeft u gedekt.

## Flow-kaarten

Flow-kaarten zijn een van de kernfuncties waarop Homey zich richt. Met Flow-kaarten kunnen Homey-gebruikers hun huis
automatiseren. Een Flow is een reeks Flow-kaarten die worden geëvalueerd en uitgevoerd.

Een Flow bestaat uit kaarten in drie kolommen: _wanneer_, _en_, _dan_. De Homey Android TV-app biedt Flow-kaarten in elk
van deze categorieën die hieronder worden vermeld. Dus, duik erin en ontdek het volledige scala aan flow-functies die
voor u beschikbaar zijn!

#### Triggers (wanneer)

Deze kaarten worden gebruikt om flows te activeren.

{% hint style="info" %}
Wanneer "**TV gaat aan**" dan "Dim de verlichting".
{% endhint %}

<table data-view="cards">
    <thead>
    <tr>
        <th></th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><strong>Turned on</strong></td>
        <td>This is triggered when your TV powers on.</td>
    </tr>
    <tr>
        <td><strong>Turned off</strong></td>
        <td>This is triggered when your TV powers off.</td>
    </tr>
    <tr>
        <td>coming soon: <strong>An app was opened</strong></td>
        <td>This is triggered when an app was opened.</td>
    </tr>
    </tbody>
</table>

#### Voorwaarden (en)

Deze kaarten worden in flows gebruikt als voorwaarde.

{% hint style="info" %}
Wanneer "Niemand thuis" en "**TV staat aan**" dan "Zet de TV uit".
{% endhint %}

<table data-view="cards">
    <thead>
    <tr>
        <th></th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><strong>Is turned on</strong></td>
        <td>Returns if the TV is powered on.</td>
    </tr>
    <tr>
        <td>Coming soon: <strong>Current app</strong></td>
        <td>Returns the current app opened on the TV.</td>
    </tr>
    </tbody>
</table>

#### Acties (dan)

Deze kaarten worden gebruikt als actie in een flow.

{% hint style="info" %}
Wanneer "Iemand komt thuis" dan "**Zet de TV aan**" en "**Open de Spotify-app**".
{% endhint %}

<table data-view="cards">
    <thead>
    <tr>
        <th></th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><strong>Turn on</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Turn off</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Turn the volume up</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Turn the volume down</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Mute the volume</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Unmute the volume</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Next</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Previous</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Play</strong></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Pause</strong></td>
        <td></td>
    </tr>
    <tr>
        <td>Coming soon: <strong>Send key</strong></td>
        <td>Select any key on your remote and simulate a key press.</td>
    </tr>
    <tr>
        <td>Coming soon: <strong>Open app</strong></td>
        <td>Open any app installed on the TV.</td>
    </tr>
    <tr>
        <td>Coming soon: <strong>Select source</strong></td>
        <td></td>
    </tr>
    </tbody>
</table>