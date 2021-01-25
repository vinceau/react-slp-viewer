# `react-slp-viewer`

> React component for viewing SLP files in browser

## Description

This repo lays the groundwork for rewriting [slippi-visualiser](https://github.com/schmooblidon/slippi-visualiser)
in Typescript and aims to remove the jQuery dependency in favour of more React-like DOM manipulation. I hope this
becomes clean enough for external contributers to help port the remaining character animations.

## Done

* Basic Typescript support
* Remove dependencies on global imports
* Lazy-load character animations on demand

### To-do

* Convert more things to Typescript
* Remove jQuery dependency completely
* Prefer [`@emotion/core`](https://github.com/emotion-js/emotion) over CSS imports
* Add missing character animations

### Known issues and other considerations

For some reason when building, I get: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed` errors
and I have no idea why. Increasing the node memory limit does not fix this issue. Starting the storybook server does not seem to be affected. My hunches are it's because the animations are so big (around 30MB altogether with only 5 supported characters), and/or the Typescript source mapping is running out of space because all those animations are on one line.

Since the animations are so big and are not particularly related the SLP playback component directly, it might be worth storing them in a different format and perhaps even in a different project. Having to rebuild the animations all the time gets tedious fast.

## Development

### Build

To build the component library, run:

```sh
yarn run build
```

To start the storybook server, run:

```sh
yarn run start
```

### Test

To run the tests:

```
yarn run test
```

### Export Storybook

To export the storybook as static files:

```
yarn run storybook
```

You can then serve the files under `storybook-static` for demonstration.

## Acknowledgements

This work is based off [Will Blackett](https://github.com/schmooblidon)'s [meleelight](https://github.com/schmooblidon/meleelight/) and [slippi-visualiser](https://github.com/schmooblidon/slippi-visualiser).

## License

This software is released under the terms of [MIT license](LICENSE).
