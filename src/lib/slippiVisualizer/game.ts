import { Playback } from "./playback";
import Player from "./player";
import { getStage } from "./stages/stages";
import Vec2D from "./utils/Vec2D";
import { clearScreen } from "./draw/draw";
import { drawPlayer } from "./draw/draw_player";
import { drawGameFinishScreen, drawOverlay, drawErrorText } from "./draw/draw_ui";
import { drawBackground, drawStage } from "./draw/draw_stage";
import { fetchAnimation } from "./animations";
// import { drawDebug } from "./draw/debug";
// import { displayDebug } from "./main";

export default class Game {
  public gameId: any;
  public replay: any;
  public compatible: any;
  public compatibilityText: any;
  public playback: Playback;
  public currentFrame: any;
  public currentFrameIdx: number;
  public lastFrame: number;
  public stage: any;
  public stageId: any;
  public players: any[];
  public playerAmount: number;
  public startTimer: number;
  public matchTimer: number;
  public animations: Map<number, any>;

  public constructor(replay, compatible, compatibilityText, id) {
    this.replay = replay;
    this.compatible = compatible;
    this.compatibilityText = compatibilityText;
    this.gameId = id;
  }

  public async init(): Promise<void> {
    this.playback = new Playback(this, this.gameId);
    if (!this.compatible) return;
    this.currentFrame = 0;
    this.currentFrameIdx = this.replay.visualiser?.startFrame ?? -123;
    this.lastFrame = this.replay.visualiser?.lastFrame ?? this.replay.metadata.lastFrame;

    this.stage = getStage(this.replay.settings.stageId);
    this.stageId = this.replay.settings.stageId;

    this.animations = new Map<number, any>();
    this.players = [];
    // build players
    for (var i = 0; i < this.replay.settings.players.length; i++) {
      var p = this.replay.settings.players[i];
      if (!this.animations.has(p.characterId)) {
        const charAnimation = await fetchAnimation(p.characterId);
        this.animations.set(p.characterId, charAnimation);
      }
      this.players[i] = new Player(
        p.playerIndex,
        p.port,
        p.characterId,
        p.characterColor,
        p.startStocks,
        p.type,
        p.teamId,
        p.nametag,
        new Vec2D(0, 0),
        1,
      );
    }
    this.playerAmount = this.replay.settings.players.length;

    this.startTimer = 2.05;
    this.matchTimer = 480;
  }

  public renderMessage(message: string) {
    clearScreen(this.gameId);
    drawBackground(this.gameId);
    drawErrorText(message ?? this.compatibilityText, this.gameId);
  }

  public finishGame() {
    if (this.replay.visualiser?.shouldLoop) {
      this.playback.restart(this.replay.visualiser?.startFrame);
    } else {
      this.playback.finished = true;
      drawGameFinishScreen(this, this.gameId);
    }
  }

  public renderState() {
    if (this.playback.finished) return;
    clearScreen(this.gameId);
    !this.playback.paused && drawBackground(this.gameId);
    drawStage(this.stage, this.currentFrameIdx, this.gameId);
    for (var i = 0; i < this.playerAmount; i++) {
      drawPlayer(this, i, this.gameId, this.animations);
    }
    drawOverlay(this, true, true, this.gameId);

    // if (displayDebug) drawDebug(this);
  }

  public updateState() {
    if (this.currentFrameIdx > this.lastFrame) {
      this.currentFrameIdx = this.lastFrame;
      this.finishGame();
      return;
    }

    // start timer ticks from frame -123 to 0
    if (this.currentFrameIdx < 0) {
      this.startTimer = Math.abs(this.currentFrameIdx) * 0.01666667;
      this.matchTimer = 480;
    }
    // from frame 0 onward the match timer will tick down
    else {
      this.startTimer = 0;
      this.matchTimer = 480 - this.currentFrameIdx * 0.01666667;
    }

    if (this.matchTimer <= 0) {
      this.finishGame();
      return;
    }

    this.currentFrame = this.replay.frames[this.currentFrameIdx];

    if (this.currentFrame == null) {
      this.finishGame();
      return;
    }

    var prevFrame = this.replay.frames[Math.max(-123, this.currentFrameIdx - 1)];

    for (var i = 0; i < this.playerAmount; i++) {
      var p = this.players[i];
      var state = this.currentFrame.players[p.playerIndex].post;
      var prevState = prevFrame.players[p.playerIndex].post;
      var slp_input = this.currentFrame.players[p.playerIndex].pre;

      // TODO : need a better way to feed this the opponent
      // need to feed opponent for thrown states, altho this may be tricky in teams
      p.update(state, prevState, slp_input, this.players[1 - i]);
    }
  }
}
