import $ from "jquery";
import { drawBackgroundInit, drawStageInit } from "./draw/draw_stage";

export class Playback {
  public game: any;
  public playing: boolean;
  public paused: boolean;
  public finished: boolean;
  public gameId: string;

  public constructor(game: any, id: string) {
    this.game = game;
    this.playing = false;
    this.paused = false;
    this.finished = false;
    this.gameId = id;
  }

  public start(shouldActivatePause: boolean) {
    if (shouldActivatePause) {
      this.togglePause();
    }
    drawBackgroundInit(this.gameId);
    if (this.game.compatible) {
      drawStageInit(this.game.stage, this.gameId);
      this.playing = true;
      this.gameTick(this.gameId);
      this.renderTick(this.gameId);
    } else {
      this.renderBGOnlyTick(this.gameId);
    }
  }

  public restart(startIndex: number) {
    this.game.currentFrameIdx = startIndex ?? -123;
    this.paused = false;
    this.finished = false;
    this.playing = true;
    $('input[type="range"]').val(this.game.currentFrameIdx).change();
  }

  public togglePause() {
    this.paused = !this.paused;
  }

  public frameForward() {
    this.paused = true;
    if (this.finished) return;
    this.game.currentFrameIdx++;
    this.game.updateState();
    this.game.renderState();
    $('input[type="range"]').val(this.game.currentFrameIdx).change();
  }

  public frameBackward() {
    this.paused = true;
    this.finished = false;
    this.game.currentFrameIdx = Math.max(-123, this.game.currentFrameIdx - 1);
    this.game.updateState();
    this.game.renderState();
    $('input[type="range"]').val(this.game.currentFrameIdx).change();
  }

  private gameTick(gameId) {
    setTimeout(() => this.gameTick(gameId), 16);
    if (!this.game.playback.playing || this.game.playback.finished || this.game.playback.paused) return;
    this.game.currentFrameIdx++;
    this.game.updateState();
    $('input[type="range"]').val(this.game.currentFrameIdx).change();
  }

  private renderTick(gameId) {
    window.requestAnimationFrame(() => this.renderTick(gameId));
    if (!this.game.playback.playing || this.game.playback.finished) return;
    this.game.renderState();
  }

  private renderBGOnlyTick(gameId) {
    window.requestAnimationFrame(() => this.renderBGOnlyTick(gameId));
    this.game.renderBGOnly();
  }
}
