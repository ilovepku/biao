[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-on%20GitHub-blueviolet)](https://github.com/sponsors/ilovepku) [![Donate via PayPal](https://img.shields.io/badge/Donate-via%20PayPal-%230d3685)](https://www.paypal.com/donate?hosted_button_id=EMK52WJM37KWY) [![Buy me a coffee](https://img.shields.io/badge/Buy%20me-a%20coffee-%23ff5f5f)](https://www.buymeacoffee.com/seanlee)

* * *

**BIAO! StoryMap** is a free, open-source app to help history lovers follow stories that highlight the locations of a series of events.

Now with dataset of the Peloponnesian War only. More contents coming soon!

[![Expo](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/expo)](https://github.com/expo/expo/blob/master/CHANGELOG.md) [![React Navigation](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/react-native-maps?color=%23f4b400)](https://github.com/react-native-maps/react-native-maps/blob/master/CHANGELOG.md) [![React Navigation](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/@react-navigation/native?color=%236b52ae)](https://github.com/react-navigation/react-navigation/blob/main/packages/native/CHANGELOG.md) [![Redux](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/redux?color=%23593d88)](https://github.com/reduxjs/redux/releases) [![React Native Modalize](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/react-native-modalize?color=%23D64292)](https://github.com/jeremybarbet/react-native-modalize/releases) [![NativeBase](https://img.shields.io/github/package-json/dependency-version/ilovepku/biao/native-base?color=%2300c497)](https://docs.nativebase.io/docs/release-notes/Release.html)

- **Supported iOS versions**: 10.0+
- **Supported Android versions**: 5.0+

<p float="left">
  <img src="https://seanlee.netlify.app/static/984cdcf952d1025c2225de06a214a1ad/ee604/timeline.png" alt="timeline" width="250">
  <img src="https://seanlee.netlify.app/static/e8ee4146ce8f8f0223d68d6d755ff8b7/ee604/details.png" alt="details" width="250">
  <img src="https://seanlee.netlify.app/static/18a54903e7e0b32622eee6dd8b4be6b8/ee604/strategic.png" alt="strategic" width="250">
  <img src="https://seanlee.netlify.app/static/5fb68ac002ed44b43efb2348882c72b8/ee604/legends.png" alt="legends" width="250">
  <img src="https://seanlee.netlify.app/static/31e38d38e70aaf27c855e175853ef20d/ee604/landscape.png" alt="landscape" width="250">
</p>

# Features
- Overall mode: view all interesting locations (battles/cities), areas of control, etc. at once, with the help of marker clustering to improve visibility and performance
- Timeline mode: swipe left and right to move through individual event abstracts in a time sequence, while following their locations and participants in zoomed-in, tracking view
- Drag drawer to full screen to read about specific event details with relevant links for even more information
- Modern interactive maps and related features (w/ Google Maps API): switch between satellite/terrain/roadmap views, filter different types of markers
- Using standard GeoJSON geographic data format
- Map legends
- Landscape mode
- Dark mode

# Planned features
See project [Triage](https://github.com/ilovepku/biao/projects/1) for priorities and [Kanban](https://github.com/ilovepku/biao/projects/2) for progress.

# Building the applications

## Required dependencies

- Install node 10+ - https://nodejs.org/en/

## Building

Before doing anything else, from the root of the project, run:

	npm install
  
## Testing the application

Then:

	npm run android
or

	npm run ios
  
The Expo packager will show, and you can either:

- install the Expo app, scan the displayed QR code, and run the app on your mobile phone directly.
- open the Android simulator.
- open the iOS simulator.

# Donations

Developing quality applications takes time, but there are also expenses, such as app store fees, hosting, digital certificates, etc. Your donation will make it possible to keep up the current development standards and bring about new features.

## PayPal

To donate via PayPal, please follow this link:

[![Donate via PayPal](https://img.shields.io/badge/Donate-via%20PayPal-%230d3685)](https://www.paypal.com/donate?hosted_button_id=EMK52WJM37KWY)

## GitHub Sponsor

Or follow this link to become a GitHub Sponsor:

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-on%20GitHub-blueviolet)](https://github.com/sponsors/ilovepku)

## Buy me a coffee

Or follow this link to buy me a coffee:

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me-a%20coffee-%23ff5f5f)](https://www.buymeacoffee.com/seanlee)

# Contributing

# Known bugs

# License

MIT License

Copyright (c) 2020 Sean Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
