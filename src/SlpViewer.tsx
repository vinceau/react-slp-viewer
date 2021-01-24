import React, { useEffect, useState } from "react";
import { Display } from "./components/Display";
import { Loading } from "./components/Loading";

import "./styles/styles.scss";
import * as slpGame from "./lib/slippiVisualizer";

export const SlpViewer: React.FC<{
  gameId: string;
  replay: any;
  size?: any;
  shouldActivatePause?: boolean;
}> = ({ gameId, replay, size, shouldActivatePause }) => {
  const [isFocus, setIsFocus] = useState(false);

  const startGame = async () => {
    slpGame.earlySetup(gameId);
    await slpGame.start({ data: replay, shouldActivatePause }, gameId);
  };

  useEffect(() => {
    if (replay) {
      startGame();
    }

    return () => slpGame.stopGame(gameId);
  }, [replay]);

  useEffect(() => {
    if (slpGame.managePause && shouldActivatePause) {
      slpGame.managePause(gameId);
    }
  }, [isFocus]);

  return (
    <div key={gameId} tabIndex={0} onMouseEnter={() => setIsFocus(!isFocus)} onMouseLeave={() => setIsFocus(!isFocus)}>
      <Display size={size} id={gameId} />
      <Loading id={gameId} />
    </div>
  );
};
