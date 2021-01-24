
# `react-gamecube`

[![npm version](https://img.shields.io/npm/v/react-gamecube.svg?style=flat)](https://npmjs.org/package/react-gamecube "View this project on npm")
[![Build Status](https://github.com/vinceau/react-gamecube/workflows/build/badge.svg)](https://github.com/vinceau/react-gamecube/actions?workflow=build)
[![License](https://img.shields.io/npm/l/react-gamecube)](https://github.com/vinceau/react-gamecube/blob/master/LICENSE)

> React component for displaying Gamecube controller inputs

![react-gamecube component screenshot example](https://i.imgur.com/h4iwbwH.png)

For an interactive demo with examples, [check out the storybook](https://vinceau.github.com/react-gamecube).

## Installation

**With NPM**

```bash
npm install react-gamecube
```

**With Yarn**

```bash
yarn add react-gamecube
```

## Usage

```jsx
const { Controller } = require("react-gamecube");
// Or import like this:
// import { Controller } from "react-gamecube";

// Make the buttons Z, R, and A pressed
const value = {
  a: true,
  r: true,
  z: true,
}

// Also hide the analog sticks
<Controller value={value} hideAnalogSticks={true} />
```

## Props

### `value`

* Type: object
* Required: No

An object containing which buttons have been pressed. See below for all the different attributes.


| Button        | Type          | Description  |
| ------------- | ------------- | ------------ |
| `start` | boolean | Start button |
| `a` | boolean | A button |
| `b` | boolean | B button |
| `x` | boolean | X button |
| `y` | boolean | Y button |
| `dd` | boolean | Dpad down |
| `dl` | boolean | Dpad left |
| `dr` | boolean | Dpad right |
| `du` | boolean | Dpad up |
| `l` | boolean | Left trigger |
| `r` | boolean | Right trigger |
| `z` | boolean | Z trigger |
| `lValue` | number | Left trigger analog value. Must be between 0 and 1. |
| `rValue` | number | Right trigger analog value. Must be between 0 and 1. |
| `controlX` | number | Analog stick X value. Must be between -1 and 1. |
| `controlY` | number | Analog stick Y value. Must be between -1 and 1. |
| `cStickX` | number | C stick X value. Must be between -1 and 1. |
| `cStickY` | number | C stick Y value. Must be between -1 and 1. |


### `hideAnalogSticks`

* Type: boolean
* Required: No
* Default: `false`

Hides both the analog stick and the C stick.

### `hideButtonText`

* Type: boolean
* Required: No
* Default: `false`

Hides the text on the buttons.

### `onClick`

* Type: `(button: string) => void`
* Required: No

A function which determines what logic should occur when a particular button is pressed.

| Button        | Description  |
| ------------- | ------------ |
| `"START"` | Start button |
| `"A"` | A button |
| `"B"` | B button |
| `"X"` | X button |
| `"Y"` | Y button |
| `"D_LEFT"` | Dpad left |
| `"D_RIGHT"` | Dpad right |
| `"D_DOWN"` | Dpad down |
| `"D_UP"` | Dpad up |
| `"L"` | L trigger |
| `"R"` | R trigger |
| `"Z"` | Z trigger |

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

## License

This software is released under the terms of [MIT license](LICENSE).
