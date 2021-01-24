import React from "react";
import { Controller } from "./Controller";

import { withKnobs, boolean } from "@storybook/addon-knobs";
import { jsxDecorator } from "storybook-addon-jsx";

export default {
  title: "src/Controller",
  component: Controller,
  decorators: [withKnobs, jsxDecorator],
};

export const Default = (): JSX.Element => {
  return <Controller />;
};
