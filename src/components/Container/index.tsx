import React from "react";

export const Container: React.FC<{
  id: string;
}> = ({ id }) => (
  <div id={`slider_container-${id}`} style={{ display: "none" }}>
    <input
      id="playback_slider"
      type="range"
      min="-123"
      max="1000"
      step="1"
      value="-123"
      data-orientation="horizontal"
    />
  </div>
);
