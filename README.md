> [!IMPORTANT]  
> This repo is archived and no longer maintained. Use [SlippiLab](https://github.com/frankborden/slippilab) instead.

# `react-slp-viewer`

> React component for viewing SLP files in browser

## Description

This repo lays the groundwork for rewriting [slippi-visualiser](https://github.com/schmooblidon/slippi-visualiser)
in Typescript and aims to remove the jQuery dependency in favour of more React-like DOM manipulation. I hope this
becomes clean enough for external contributers to help port the remaining character animations.

### Done

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
and I have no idea why. Increasing the node memory limit does not fix this issue. Starting the storybook server does not seem to be affected. My hunches are it's because the animations are so big (around 30MB altogether with only 5 supported characters), and/or the Typescript source mapping is running out of space.

Since the animations are so big and are not particularly related the SLP playback component directly, it might be worth storing them in a different format and perhaps even in a different project. Having to rebuild the animations all the time gets tedious fast.

### Adding Character Animations

Only 5 out of the 26 Melee characters are supported at the moment. It would be nice if we could import the rest of the character animations.
[Will Blackett](https://github.com/schmooblidon) had this to say about how the animation information was extracted, which may be helpful:

```
creating them is kind of a huge mission
i use dolphin with some gecko codes, like green screen, no vfx, no flashing, camera follows base position, then setup a nice camera angle for a character and just go through every action and screenshot each frame
from there, take those screenshots and plug in all frame of an action into gimp as a single file/window as layers
and then run a script that selects them and creates a path
exports an svg, and i take that and convert to the arrays
there are definitely better ways to do this nowadays
both with anims + models being pretty easy to export and view
or with training modes easy code editing to go through all the action frames for you
but imo, paths are not even that good. they are pretty expensive. you could load in the models and anims in webgl and it'd run much better
```

It's possible that we can simplify the SVG paths by removing as many unnecessary points, making the characters less sharp and pointy, while also improving performance and reducing space.

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
