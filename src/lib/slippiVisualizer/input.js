import Vec2D from "./utils/Vec2D";

const Button = {
  none : 0x0000,
  dpadLeft : 0x0001,
  dpadRight : 0x0002,
  dpadDown : 0x0004,
  dpadUp : 0x0008,
  z : 0x0010,
  r : 0x0020,
  l : 0x0040,
  a : 0x0100,
  b : 0x0200,
  x : 0x0400,
  y : 0x0800,
  start : 0x1000
}

export default function Input() {
  this.lStick = new Vec2D(0,0);
  this.rawLStick = new Vec2D(0,0);
  this.cStick = new Vec2D(0,0);
  this.lA = 0;
  this.rA = 0;
  this.start = false;
  this.z = false;
  this.a = false;
  this.b = false;
  this.x = false;
  this.y = false;
  this.r = false;
  this.l = false;
  this.dpadLeft = false;
  this.dpadDown = false;
  this.dpadRight = false;
  this.dpadUp = false;

  // takes in slippi replay input
  this.setInput = function(input) {
    this.lStick.x = input.joystickX;
    this.lStick.y = input.joystickY;
    this.cStick.x = input.cStickX;
    this.cStick.y = input.cStickY;

    var buttons = input.physicalButtons;

    this.dpadLeft = (buttons & Button.dpadLeft) != Button.none;
    this.dpadRight = (buttons & Button.dpadRight) != Button.none;
    this.dpadDown = (buttons & Button.dpadDown) != Button.none;
    this.dpadUp = (buttons & Button.dpadUp) != Button.none;
    this.z = (buttons & Button.z) != Button.none;
    this.r = (buttons & Button.r) != Button.none;
    this.l = (buttons & Button.l) != Button.none;
    this.a = (buttons & Button.a) != Button.none;
    this.b = (buttons & Button.b) != Button.none;
    this.x = (buttons & Button.x) != Button.none;
    this.y = (buttons & Button.y) != Button.none;
    this.start = (buttons & Button.start) != Button.none;

    this.rA = this.r ? 1 : input.physicalRTrigger;
    this.lA = this.l ? 1 : input.physicalLTrigger;

  }
}