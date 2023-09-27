---
description: Welkom bij de veelgestelde vragen voor de Homey Android TV-app!
---

# FAQ

Hier vind je antwoorden op de meest gestelde vragen over de app en hoe deze werkt. Of je nu een nieuwe gebruiker bent of
de app al een tijdje gebruikt, deze pagina is een geweldige bron om de informatie te vinden die je nodig hebt.

Als je het antwoord dat je zoekt niet kunt vinden, kun je gerust een supportticket indienen voor verdere hulp.

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Een supportticket indienen op Github</td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td><td><a href="../.gitbook/assets/github.png">github.png</a></td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td></tr></tbody></table>

## Overview

* [Is dit een officiële app?](faq.md#is-dit-een-officiële-app)
* [Waarom is mijn apparaat niet beschikbaar?](faq.md#waarom-is-mijn-apparaat-niet-beschikbaar)
* [Waarom wordt mijn Android TV niet gevonden?](faq.md#waarom-wordt-mijn-android-tv-niet-gevonden)
* [Hoe werkt de app?](faq.md#hoe-werkt-de-app)

### Is dit een officiële app?

Nee, de Android TV-app voor Homey is geen officiële app en is op geen enkele manier verbonden met Android of Google.

Het is gemaakt door de toegewijde inspanningen van een groep mensen die de Android Remote API reverse-engineered hebben.
Hoewel we streven naar een hoogwaardige en functionele app, willen we benadrukken dat het niet wordt ondersteund of
onderschreven door Android of Google.

### Waarom is mijn apparaat niet beschikbaar

Als je problemen ondervindt waarbij je Android TV-apparaat niet beschikbaar lijkt te zijn in de Homey-app, kunnen er een paar veelvoorkomende redenen zijn voor dit probleem:

1. **Netwerkinstellingen**: Soms kan de Homey-app geen verbinding maken met je TV vanwege netwerkinstellingen. Zorg ervoor dat je Android TV en het apparaat waarop de Homey-app draait, zijn verbonden met hetzelfde Wi-Fi-netwerk. Controleer daarnaast of je Android TV correct is verbonden met internet en er geen netwerkproblemen zijn die de connectiviteit beïnvloeden.

2. **Gecrashte Remote Service**: In veel gevallen kan het probleem van onbeschikbaarheid worden toegeschreven aan een gecrashte Remote Service op je Android TV, wat het onderdeel is waarmee de Homey-app communiceert. Om dit op te lossen, kun je proberen een harde herstart van je Android TV uit te voeren. Zo doe je dat:

    * **Volledig uitschakelen**: Schakel je Android TV uit met de afstandsbediening of de aan/uit-knop op de TV zelf.

    * **Stekker uit het stopcontact**: Nadat deze is uitgeschakeld, haal je de stekker van je Android TV uit het stopcontact. Wacht ongeveer 30 seconden tot een minuut.

    * **Weer aansluiten**: Sluit de stroomkabel opnieuw aan op je Android TV en zet hem aan.

    * **Controleer de Homey-app**: Nadat je Android TV volledig is herstart, open je de Homey-app opnieuw en controleer je of het apparaat nu beschikbaar is.

   Een harde herstart kan vaak problemen met de Remote Service oplossen en de connectiviteit met de Homey-app herstellen.

Als je deze stappen hebt geprobeerd en je Android TV nog steeds niet beschikbaar is in de Homey-app, zorg er dan voor dat zowel de Homey-app als de systeemsoftware van je Android TV up-to-date zijn. Als het probleem aanhoudt, kun je overwegen om contact op te nemen en een ticket in te dienen.

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Dien een ticket in op Github</td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td><td><a href="../.gitbook/assets/github.png">github.png</a></td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td></tr></tbody></table>

### Waarom wordt mijn Android TV niet gevonden

Als je Android TV niet automatisch wordt gedetecteerd door de Homey-app, zijn hier enkele mogelijke redenen en oplossingen:

1. **Ondersteuning voor Chromecast**: Zorg ervoor dat je TV Chromecast ondersteunt, aangezien de Homey-app deze service gebruikt voor detectie.

2. **Verschillende Subnetten**: Zorg ervoor dat zowel je TV als het apparaat waarop de Homey-app draait, zich in hetzelfde netwerksubnet bevinden.

3. **Handmatige Toevoeging**: Als automatische detectie mislukt, voeg je je TV handmatig toe met behulp van het IP-adres. Zo vind je het IP-adres van je TV in de netwerkinstellingen en voeg je het toe in de Homey-app.

Als je aanhoudende problemen ondervindt, controleer dan op updates voor de app en het systeem van je TV, of neem contact met ons op en dien een ticket in.

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Dien een ticket in op Github</td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td><td><a href="../.gitbook/assets/github.png">github.png</a></td><td><a href="https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+">https://github.com/lucasvdh/codes.lucasvdh.android-tv/issues/new?assignees=lucasvdh&#x26;labels=question&#x26;template=question.md&#x26;title=%5BQuestion%5D+</a></td></tr></tbody></table>


### Hoe werkt de app?

De Homey Android TV-app werkt via het gebruik van de Android Remote API. De Android Remote API is een set
programmeerinterfaces waarmee ontwikkelaars bepaalde functies van Android Smart TV's kunnen communiceren en besturen.

De Homey Android TV-app maakt gebruik van deze API om gebruikers een naadloze integratie tussen hun Android TV en het
Homey-platform te bieden. De Android Remote API is essentieel voor de werking van de Homey Android TV-app.
