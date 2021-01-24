// import React from "react";
import $ from "jquery";
import Game from "./game";
import { setupLayers } from "./draw/draw";
import { setupControls } from "./controls";
import { stageExists } from "./stages/stages";
import { characterExists } from "./characters";
import { drawBackgroundInit, drawBackground } from "./draw/draw_stage";
import { drawLoading } from "./draw/draw_ui";
import { resize } from "./window";

let curGame = new Map();

function isObj(obj) {
  return obj === Object(obj) && Object.prototype.toString.call(obj) !== "[object Array]";
}

let compatible = new Map();
let compatibilityText = ["", ""];

export function earlySetup(id) {
  $(`#display-${id}`).show();
  setupLayers(id);
  resize();
  drawBackgroundInit(id);
  drawBackground(id);
  drawLoading(id);
  resize();
}

export async function start(event, id) {
  if (event.type !== "message") {
    // if game is already playing, exit
    if (curGame.get(id) != null) return;
    compatible.set(id, true);
    $(`#loading_anim-${id}`).fadeOut(200);
    // resize();
    const slp_replay = event.data;
    if (!isObj(slp_replay)) {
      compatible.set(id, false);
      compatibilityText = ["Invalid input"];
    } else if (!isCompatible(slp_replay)) {
      compatible.set(id, false);
    }
    const game = new Game(slp_replay, compatible.get(id), compatibilityText, id);
    await game.init();
    curGame.set(id, game);
    //setupControlsBox();
    if (compatible.get(id)) {
      setupControls(game);
      $(`#slider_container-${id}`).show();
    }
    curGame.get(id).playback.start(event.shouldActivatePause);
  }
}

function isCompatible(slp_replay) {
  for (var i = 0; i < slp_replay.settings.players.length; i++) {
    if (!characterExists(slp_replay.settings.players[i].characterId)) {
      // console.log("CHARACTER DOESN'T EXIST YET!");
      compatibilityText = ["Character not yet", "implemented"];
      return false;
    }
  }
  if (!stageExists(slp_replay.settings.stageId)) {
    // console.log("STAGE DOESN'T EXIST YET!");
    compatibilityText = ["Stage not yet", "implemented"];
    return false;
  }
  return true;
}

export function managePause(id) {
  curGame.get(id)?.playback?.togglePause();
}

export function stopGame(id) {
  $(`#display-${id}`).remove();
  curGame.delete(id);
}
