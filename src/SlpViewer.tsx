import React, { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Display } from "./components/Display";
import { Loading } from "./components/Loading";

import "./styles/styles.scss";
import * as slpGame from "./lib/slippiVisualizer";

export const SlpViewer: React.FC<{
  gameId: string;
  replay: any;
  size?: any;
  shouldShowSlider?: boolean;
  shouldActivatePause?: boolean;
}> = ({ gameId, replay, size, shouldShowSlider, shouldActivatePause }) => {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (replay) {
      (async () => {
        slpGame.earlySetup(gameId);
        await slpGame.start({ data: replay, shouldActivatePause }, gameId);
      })();
    }

    return () => slpGame.stopGame(gameId);
  }, [replay]);

  useEffect(() => {
    slpGame.managePause && shouldActivatePause && slpGame.managePause(gameId);
  }, [isFocus]);

  return (
    <div key={gameId} tabIndex={0} onMouseEnter={() => setIsFocus(!isFocus)} onMouseLeave={() => setIsFocus(!isFocus)}>
      <Display size={size} id={gameId} />
      {shouldShowSlider && <Container id={gameId} />}
      <Loading id={gameId} />
    </div>
  );
};
