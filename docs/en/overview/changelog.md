---
description: Welcome to the changelog overview for the Homey Android TV app!
---

# Changelog

Here, you'll find a comprehensive list of updates and changes made to the app, so you can stay informed on its progress and development. Whether you're a new user or have been using the app for a while, this page is a great resource to keep up-to-date with all the latest features and improvements.

We strive to continuously enhance and optimize the app to provide the best possible experience for our users, so check back regularly to see what's new.

<details>

<summary>v0.5.0 - 2023-09-27</summary>

#### Features
* Added repair flow for when TV was unpaired
* Refactor `androidtv-remote` dependency to an internal TypeScript module to fix issues, improve performance and allow for more control and flexibility.

#### Fixes/improvements
* Fixed infinite crash loop when TV is unavailable
* Removed unused dependencies

</details>

<details>

<summary>v0.3.0 - 2023-03-03</summary>

#### Features
- Added missing pairing translations for `nl`, `de`, `fr`, `it`, `sv`, `no`, `es`, `da`, `pl`
- New `send_key` flow card action, simulate a key press from a flow
- New `application_opened` flow card trigger, trigger flows when the current app changes

#### Fixes
- The volume up, down and mute buttons not working

#### Changes
- The `volume` capability was changed from a `slider` UI component to a `sensor`
</details>

<details>

<summary>v0.0.1 - 2023-02-13</summary>

#### Features

* Initial version

</details>

