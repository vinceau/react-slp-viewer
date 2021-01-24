/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

export const Controller: React.FC = () => {
  return (
    <div
      css={css`
        background-color: red;
      `}
    >
      <h1>Hello world</h1>
    </div>
  );
};
