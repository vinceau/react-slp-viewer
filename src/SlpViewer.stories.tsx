import React from "react";
import { SlpViewer } from "./SlpViewer";

import replay from "./replay.json";
import { withKnobs } from "@storybook/addon-knobs";
import { jsxDecorator } from "storybook-addon-jsx";

export default {
  title: "src/SlpViewer",
  component: SlpViewer,
  decorators: [withKnobs, jsxDecorator],
};

export const Default = (): JSX.Element => {
  return <SlpViewer gameId="hello-world" replay={replay} size={undefined} shouldActivatePause={undefined} />;
};
