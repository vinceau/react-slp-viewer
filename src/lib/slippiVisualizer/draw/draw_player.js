import { layersBg, drawArrayPathCompress } from "./draw";
import makeColour from "../utils/makeColour";
import Vec2D from "../utils/Vec2D";
import { externalCharacterIDs } from "../characters";
// import { animations } from "../animations";
import { palettes } from "./palettes";

// import marth from "../animations/marth";
// import puff from "../animations/puff";
// import fox from "../animations/fox";
// const falco = require("../animations/falco");
// const falcon = require("../animations/falcon");

// const animations = [marth /*, fox , falco, falcon*/];

const twoPi = Math.PI * 2;

// takes in player and stage
export function drawPlayer(g, i, id, animationsMap) {
  var stage = g.stage;
  var p = g.players[i];
  if (p.dead) return;
  var temX = p.phys.pos.x * stage.scale + stage.offset.x;
  var temY = p.phys.pos.y * -stage.scale + stage.offset.y;
  var face = p.phys.face;
  var frame = Math.floor(p.action.counter);
  if (frame == 0) {
    frame = 1;
  }

  const charAnimations = animationsMap.get(p.charID);

  /*if (frame > framesData[characterSelections[i]][p.action.name]) {
        frame = framesData[characterSelections[i]][p.action.name];
    }*/
  if (charAnimations[p.action.name] === undefined) {
    return;
  }

  const animation = charAnimations[p.action.name].default;

  if (frame - 1 > animation.length - 1) {
    frame = animation.length;
  }
  if (animation[frame - 1] === undefined) {
    frame = animation.length;
  }
  var model = animation[frame - 1];
  // TURN
  if (p.action.name == "SMASHTURN") {
    face *= -1;
  }
  // MARTH BAIR
  else if (p.action.name == "ATTACKAIRB" && externalCharacterIDs[p.charID] == "MARTH") {
    if (frame > 29) {
      face *= -1;
    }
  }
  // FOX/FALCO BTHROW
  else if (
    p.action.name == "THROWBACK" &&
    (externalCharacterIDs[p.charID] == "FOX" || externalCharacterIDs[p.charID] == "FALCO")
  ) {
    if (frame >= 10) {
      face *= -1;
    }
  }
  p.rotation = 0;
  p.rotationPoint = new Vec2D(0, 0);
  // FIREFOX
  if (p.action.name == "UPSPECIALLAUNCH") {
    if (
      (externalCharacterIDs[p.charID] == "FOX" && frame < 31) ||
      (externalCharacterIDs[p.charID] == "FALCO" && frame < 23)
    ) {
      p.rotation = Math.PI / 2 - Math.atan2(p.phys.posDelta.y, p.phys.posDelta.x);
      p.rotationPoint = new Vec2D(0, 40);
    }
  }
  var palette = palettes[p.playerIndex];
  var col = palette[0];
  if (temX > 1220 || temX < -20 || temY > 880 || temY < -30) {
    var pA = new Vec2D(temX - 600, temY - 375);
    var pB = new Vec2D(0, 0);
    var s = (pA.y - pB.y) / (pA.x - pB.x);
    if (-375 <= s * 600 && s * 600 <= 375) {
      if (pA.x > pB.x) {
        p.miniViewPoint = new Vec2D(1150, s * 600 + 375);
        p.miniViewSide = 0;
      } else {
        p.miniViewPoint = new Vec2D(50, -s * 600 + 375);
        p.miniViewSide = 1;
      }
      p.miniView = true;
    } else if (-600 <= 375 / s && 375 / s <= 600) {
      if (pA.y > pB.y) {
        if (temX < 50) {
          p.miniViewPoint = new Vec2D(50, 700);
        } else if (temX > 1150) {
          p.miniViewPoint = new Vec2D(1150, 700);
        } else {
          //p.miniViewPoint = new Vec2D(375/s+stage.offset.x,700);
          p.miniViewPoint = new Vec2D(temX, 700);
        }
        p.miniViewSide = 2;
      } else {
        p.miniViewPoint = new Vec2D(-375 / s + stage.offset.x, 50);
        p.miniViewSide = 2;
      }
      p.miniView = true;
    } else {
      p.miniView = false;
    }
  } else {
    p.miniView = false;
  }
  if (p.miniView && p.action.name != "SLEEP" && !p.starKO) {
    layersBg.get(id).fg2.fillStyle = "black";
    layersBg.get(id).fg2.strokeStyle = palette[0];
    layersBg.get(id).fg2.beginPath();
    layersBg.get(id).fg2.arc(p.miniViewPoint.x, p.miniViewPoint.y, 35, twoPi, 0);
    layersBg.get(id).fg2.fill();
    layersBg.get(id).fg2.lineWidth = 6;
    layersBg.get(id).fg2.stroke();
    layersBg.get(id).fg2.lineWidth = 1;
    drawArrayPathCompress(
      layersBg.get(id).fg2,
      col,
      face,
      p.miniViewPoint.x,
      p.miniViewPoint.y + 30,
      model,
      p.attributes.bubbleScale,
      p.attributes.bubbleScale,
      p.rotation,
      p.rotationPoint.x,
      p.rotationPoint.y,
    );
  } else {
    if (p.action.name == "ENTRANCE") {
      drawArrayPathCompress(
        layersBg.get(id).fg2,
        col,
        face,
        temX,
        temY,
        model,
        p.attributes.scale * (stage.scale / 4.5),
        Math.min(p.attributes.scale, p.attributes.scale * (2.05 - g.startTimer)) * (stage.scale / 4.5),
        p.rotation,
        p.rotationPoint.x,
        p.rotationPoint.y,
      );
    } else {
      var scale = 1;
      if (p.starKO) {
        scale = 0.25;
      }
      drawArrayPathCompress(
        layersBg.get(id).fg2,
        col,
        face,
        temX,
        temY,
        model,
        p.attributes.scale * (stage.scale / 4.5) * scale,
        p.attributes.scale * (stage.scale / 4.5) * scale,
        p.rotation,
        p.rotationPoint.x,
        p.rotationPoint.y,
      );
    }
    if (p.shield.active) {
      var shield_pos = p.getShieldPosition();
      var sX = shield_pos.x * stage.scale + stage.offset.x;
      var sY = shield_pos.y * -stage.scale + stage.offset.y;
      var sCol = palette[2];
      if (Math.floor(p.shield.stun) > 0) {
        sCol = palette[4];
      }
      layersBg.get(id).fg2.fillStyle = sCol + 0.6 * p.shield.analog + ")";
      layersBg.get(id).fg2.beginPath();
      layersBg.get(id).fg2.arc(sX, sY, p.shield.size * stage.scale, twoPi, 0);
      layersBg.get(id).fg2.fill();
    }
    if (p.hasNametag) {
      layersBg.get(id).fg2.fillStyle = makeColour(0, 0, 0, 0.5);
      layersBg.get(id).fg2.strokeStyle = palette[0];
      layersBg.get(id).fg2.lineWidth = 1;
      var size = 10 * p.nametag.length;
      layersBg.get(id).fg2.fillRect(temX - size / 2, temY - 130 * (stage.scale / 4.5), size, 20);
      layersBg.get(id).fg2.strokeRect(temX - size / 2, temY - 130 * (stage.scale / 4.5), size, 20);
      layersBg.get(id).fg2.font = "13px Lucida Console, monaco, monospace";
      layersBg.get(id).fg2.textAlign = "center";
      layersBg.get(id).fg2.fillStyle = "white";
      layersBg.get(id).fg2.fillText(p.nametag, temX, temY + 15 - 130 * (stage.scale / 4.5));
      layersBg.get(id).fg2.fillStyle = palette[0];
      layersBg.get(id).fg2.beginPath();
      layersBg.get(id).fg2.moveTo(temX - 8, temY + 20 - 130 * (stage.scale / 4.5));
      layersBg.get(id).fg2.lineTo(temX + 8, temY + 20 - 130 * (stage.scale / 4.5));
      layersBg.get(id).fg2.lineTo(temX, temY + 28 - 130 * (stage.scale / 4.5));
      layersBg.get(id).fg2.closePath();
      layersBg.get(id).fg2.fill();
      layersBg.get(id).fg2.textAlign = "start";
    }
  }
  if (p.action.name == "REBIRTH" || p.action.name == "REBIRTHWAIT") {
    layersBg.get(id).fg2.fillStyle = palette[1];
    layersBg.get(id).fg2.strokeStyle = palette[0];
    layersBg.get(id).fg2.lineWidth = 1;
    layersBg.get(id).fg2.beginPath();
    layersBg.get(id).fg2.moveTo(temX + 18 * (stage.scale / 4.5), temY + 13.5 * (stage.scale / 4.5));
    layersBg.get(id).fg2.lineTo(temX + 31.5 * (stage.scale / 4.5), temY);
    layersBg.get(id).fg2.lineTo(temX - 31.5 * (stage.scale / 4.5), temY);
    layersBg.get(id).fg2.lineTo(temX - 18 * (stage.scale / 4.5), temY + 13.5 * (stage.scale / 4.5));
    layersBg.get(id).fg2.closePath();
    layersBg.get(id).fg2.fill();
    layersBg.get(id).fg2.stroke();
  }
}
