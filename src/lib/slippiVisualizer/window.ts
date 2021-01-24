import $ from "jquery";

export function resize() {
  var wW = $(window).width();
  var wH = $(window).height();
  var maxScale = wH / 750;
  var scale = Math.min(maxScale, wW / 1200);
  var mY = wH - scale * 750;
  var mX = wW - scale * 1200;
  $("#display").css({
    "margin-left": mX / 2 + "px",
    "margin-top": mY / 2 + "px",
    "-webkit-transform": "scale(" + scale + ", " + scale + ")",
    transform: "scale(" + scale + ", " + scale + ")",
    "-ms-transform": "scale(" + scale + ", " + scale + ")",
  });
  $("body").height(wH);
}
