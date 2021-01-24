import React from "react";
import logo from "../../styles/images/slippi_logo.svg";

const getHeight = (size) => {
  const parsed = parseInt(size);
  return !Number.isNaN(parsed) ? `${parsed * 0.62}rem` : size;
};

export const Display: React.FC<{
  size?: any;
  id: any;
}> = ({ size, id }) => {
  const defaultSize = size ?? "auto";
  return (
    <div
      id={`display-${id}`}
      style={{
        width: defaultSize,
        height: getHeight(defaultSize),
      }}
    >
      <div id="slippi_logo">
        <a href="https://slippi.gg/">
          <img src={logo} alt="Project Slippi" width={defaultSize} height={defaultSize} />
        </a>
      </div>
      <canvas
        id={`background1Canvas-${id}`}
        className="gameCanvas"
        style={{ width: defaultSize }}
        width={1200}
        height={750}
      />
      <canvas
        id={`background2Canvas-${id}`}
        className="gameCanvas"
        style={{ width: defaultSize }}
        width={1200}
        height={750}
      />
      <canvas
        id={`foreground1Canvas-${id}`}
        className="gameCanvas"
        style={{ width: defaultSize }}
        width={1200}
        height={750}
      />
      <canvas
        id={`foreground2Canvas-${id}`}
        className="gameCanvas"
        style={{ width: defaultSize }}
        width={1200}
        height={750}
      />
      <canvas id={`uiCanvas-${id}`} className="gameCanvas" style={{ width: defaultSize }} width={1200} height={750} />
    </div>
  );
};
