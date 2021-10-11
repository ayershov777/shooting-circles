import KeyboardControl from "./keyboard-control";
import Player from "./player";

export default class GameControls {
  private player: Player;

  private wKey: KeyboardControl;
  private aKey: KeyboardControl;
  private sKey: KeyboardControl;
  private dKey: KeyboardControl;

  constructor(player: Player) {
    this.player = player;
    this.wKey = new KeyboardControl("w", this.pressW, this.releaseW);
    this.aKey = new KeyboardControl("a", this.pressA, this.releaseA);
    this.sKey = new KeyboardControl("s", this.pressS, this.releaseS);
    this.dKey = new KeyboardControl("d", this.pressD, this.releaseD);
  }

  // w key
  private pressW() {
    console.log("pressed w");
    this.player.up();
  }

  private releaseW() {
    console.log("released w");
  }

  // a key
  private pressA() {
    console.log("pressed a");
    this.player.left();
  }

  private releaseA() {
    console.log("released a");
  }

  // s key
  private pressS() {
    console.log("pressed s");
    this.player.down();
  }

  private releaseS() {
    console.log("released s");
  }

  // d key
  private pressD() {
    console.log("pressed d");
    this.player.right();
  }

  private releaseD() {
    console.log("released d");
  }
}
