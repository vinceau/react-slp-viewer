import { layersBg } from "./draw";
import { palettes } from "./palettes";

export let lostStockQueue = [];
const twoPi = Math.PI * 2;

export function drawOverlay(game, showMatchTimer, showStock, id) {
  // stocks, percent, timer;
  layersBg.get(id).ui.strokeStyle = "black";
  if (showMatchTimer) {
    layersBg.get(id).ui.fillStyle = "white";
    layersBg.get(id).ui.lineWidth = 2;
    layersBg.get(id).ui.font = "900 40px Arial";
    layersBg.get(id).ui.textAlign = "center";
    var min = Math.floor(game.matchTimer / 60).toString();
    var sec = (game.matchTimer % 60).toFixed(2);
    layersBg
      .get(id)
      .ui.fillText(
        (min.length < 2 ? "0" + min : min) + ":" + (sec.length < 5 ? "0" + sec[0] : sec[0] + sec[1]),
        590,
        70,
      );
    layersBg
      .get(id)
      .ui.strokeText(
        (min.length < 2 ? "0" + min : min) + ":" + (sec.length < 5 ? "0" + sec[0] : sec[0] + sec[1]),
        590,
        70,
      );
    layersBg.get(id).ui.font = "900 25px Arial";
    layersBg.get(id).ui.fillText(sec.length < 5 ? sec[2] + sec[3] : sec[3] + sec[4], 670, 70);
    layersBg.get(id).ui.strokeText(sec.length < 5 ? sec[2] + sec[3] : sec[3] + sec[4], 670, 70);
  }
  if (showStock) {
    layersBg.get(id).ui.font = "900 53px Arial";
    layersBg.get(id).ui.lineWidth = 2;
    layersBg.get(id).ui.textAlign = "end";
    layersBg.get(id).ui.save();
    layersBg.get(id).ui.scale(0.8, 1);
    for (var i = 0; i < game.playerAmount; i++) {
      var p = game.players[i];
      var portNum = p.port - 1;
      layersBg.get(id).ui.fillStyle =
        "rgb(255," + Math.max(255 - p.percent, 0) + ", " + Math.max(255 - p.percent, 0) + ")";
      layersBg
        .get(id)
        .ui.fillText(
          Math.floor(p.percent) + "%",
          (450 + portNum * 145 + p.percent_pos.x) * 1.25,
          670 + p.percent_pos.y,
        );
      layersBg
        .get(id)
        .ui.strokeText(
          Math.floor(p.percent) + "%",
          (450 + portNum * 145 + p.percent_pos.x) * 1.25,
          670 + p.percent_pos.y,
        );
    }
    layersBg.get(id).ui.restore();
    for (var i = 0; i < game.playerAmount; i++) {
      layersBg.get(id).ui.fillStyle = palettes[game.players[i].playerIndex][0];
      var portNum = game.players[i].port - 1;
      for (var j = 0; j < game.players[i].stocks; j++) {
        layersBg.get(id).ui.beginPath();
        layersBg.get(id).ui.arc(337 + portNum * 145 + j * 30, 600, 12, 0, twoPi);
        layersBg.get(id).ui.closePath();
        layersBg.get(id).ui.fill();
        layersBg.get(id).ui.stroke();
      }
    }
    const lostStockPopQueue = [];
    layersBg.get(id).ui.fillStyle = "white";
    layersBg.get(id).ui.strokeStyle = "white";
    for (var i = 0; i < lostStockQueue.length; i++) {
      lostStockQueue[i][2]++;
      if (lostStockQueue[i][2] > 20) {
        lostStockPopQueue.push(i);
      } else {
        layersBg.get(id).ui.save();
        layersBg.get(id).ui.translate(337 + lostStockQueue[i][0] * 145 + lostStockQueue[i][1] * 30 - 2, 600 - 2);
        layersBg.get(id).ui.fillRect(lostStockQueue[i][2], 0, 4, 4);
        layersBg.get(id).ui.fillRect(lostStockQueue[i][2], lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.fillRect(-lostStockQueue[i][2], lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.fillRect(lostStockQueue[i][2], -lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.fillRect(-lostStockQueue[i][2], -lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.fillRect(-lostStockQueue[i][2], 0, 4, 4);
        layersBg.get(id).ui.fillRect(0, lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.fillRect(0, -lostStockQueue[i][2], 4, 4);
        layersBg.get(id).ui.beginPath();
        layersBg.get(id).ui.arc(2, 2, lostStockQueue[i][2] / 2, 0, twoPi);
        layersBg.get(id).ui.closePath();
        layersBg.get(id).ui.stroke();
        layersBg.get(id).ui.restore();
      }
    }
    for (var k = 0; k < lostStockPopQueue.length; k++) {
      lostStockQueue.splice(lostStockPopQueue[k] - k, 1);
    }
    layersBg.get(id).ui.textAlign = "start";
  }
}

export function setLostStockQueue(index, val) {
  lostStockQueue[index] = val;
}

export function resetLostStockQueue() {
  lostStockQueue = [];
}

export function drawGameFinishScreen(game, id) {
  layersBg.get(id).fg2.save();
  layersBg.get(id).fg2.textAlign = "center";
  var text = "Game!";
  var size = 300;
  var textScale = 1;
  var textGrad = layersBg.get(id).fg2.createLinearGradient(0, 200, 0, 520);
  if (game.matchTimer <= 0) {
    text = "Time!";
    //sounds.time.play();
    textGrad.addColorStop(0, "black");
    textGrad.addColorStop(0.5, "black");
    textGrad.addColorStop(0.7, "rgb(21, 51, 180)");
    textGrad.addColorStop(1, "rgb(71, 94, 250)");
  } else {
    //sounds.game.play();
    textGrad.addColorStop(0, "black");
    textGrad.addColorStop(0.4, "black");
    textGrad.addColorStop(0.7, "rgb(167, 27, 40)");
    textGrad.addColorStop(1, "rgb(255, 31, 52)");
  }
  layersBg.get(id).fg2.scale(1, textScale);
  layersBg.get(id).fg2.fillStyle = textGrad;
  layersBg.get(id).fg2.lineWidth = 40;
  layersBg.get(id).fg2.strokeStyle = "black";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale);
  layersBg.get(id).fg2.lineWidth = 20;
  layersBg.get(id).fg2.strokeStyle = "white";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale);
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.fillText(text, 600, 470 / textScale);
  layersBg.get(id).fg2.restore();
}

export function drawLoading(id) {
  layersBg.get(id).fg2.save();
  layersBg.get(id).fg2.textAlign = "center";
  var text = "Loading";
  var size = 150;
  var yoff = -50;
  var textScale = 1;
  var textGrad = layersBg.get(id).fg2.createLinearGradient(0, 200 + 70 + yoff, 0, 520 - 30 + yoff);
  textGrad.addColorStop(0, "black");
  textGrad.addColorStop(0.5, "black");
  textGrad.addColorStop(0.7, "rgb(21, 51, 180)");
  textGrad.addColorStop(1, "rgb(71, 94, 250)");
  layersBg.get(id).fg2.scale(1, textScale);
  layersBg.get(id).fg2.fillStyle = textGrad;
  layersBg.get(id).fg2.lineWidth = 30;
  layersBg.get(id).fg2.strokeStyle = "black";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale - 30 + yoff);
  layersBg.get(id).fg2.lineWidth = 15;
  layersBg.get(id).fg2.strokeStyle = "white";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale - 30 + yoff);
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.fillText(text, 600, 470 / textScale - 30 + yoff);
  layersBg.get(id).fg2.restore();
}

export function drawErrorText(txtArray, id) {
  var y = (txtArray.length - 1) * -50 + 50;
  for (var i = 0; i < txtArray.length; i++) {
    drawErrorTextLine(txtArray[i], y + i * 100, id);
  }
}

function drawErrorTextLine(text, yOff, id) {
  layersBg.get(id).fg2.save();
  layersBg.get(id).fg2.textAlign = "center";
  var size = 100;
  var textScale = 1;
  var textGrad = layersBg.get(id).fg2.createLinearGradient(0, 250 + yOff, 0, 420 + yOff);
  textGrad.addColorStop(0, "black");
  textGrad.addColorStop(0.4, "black");
  textGrad.addColorStop(0.7, "rgb(167, 27, 40)");
  textGrad.addColorStop(1, "rgb(255, 31, 52)");
  layersBg.get(id).fg2.scale(1, textScale);
  layersBg.get(id).fg2.fillStyle = textGrad;
  layersBg.get(id).fg2.lineWidth = 10;
  layersBg.get(id).fg2.strokeStyle = "black";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale - 100 + yOff);
  layersBg.get(id).fg2.lineWidth = 5;
  layersBg.get(id).fg2.strokeStyle = "white";
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.strokeText(text, 600, 470 / textScale - 100 + yOff);
  layersBg.get(id).fg2.font = "900 " + size + "px Arial";
  layersBg.get(id).fg2.fillText(text, 600, 470 / textScale - 100 + yOff);
}
