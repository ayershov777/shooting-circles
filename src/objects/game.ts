import * as PIXI from "pixi.js";
import KeyboardControls from "./keyboard-controls";
import Player from "./player";
import World from "./world";

export default class Game {
  private app: PIXI.Application;
  private keyboardControls: KeyboardControls;
  private player: Player;
  private world: World;
  private gamepads: Gamepad[];

  constructor() {
    this.app = new PIXI.Application();
    this.keyboardControls = new KeyboardControls();
    this.player = new Player(this.app, this.keyboardControls);
    this.world = new World(this.app);
    // @ts-ignore
    this.gamepads = navigator.getGamepads();

    this.initWorld();
    this.setup();
  }

  private initWorld() {
    this.world.addObject(this.player);
  }

  private setup() {
    document.body.appendChild(this.app.view);
    // gamepad
    this.supportGamepad();
    this.getStateOfGamepads();
    this.gamepadConnected();
    this.gamepadDisconnected();
    // initiate game loop
    this.app.ticker.add((delta) => this.gameLoop(delta));
  }

  private gameLoop(delta: number) {
    this.player.update();
  }

  private supportGamepad() {
    return !!navigator.getGamepads();
  }

  // Get the state of all gamepads
  private getStateOfGamepads() {
    if (this.gamepads) {
      for (let i: number = 0; i < this.gamepads.length; i++) {
        console.log("Gamepad " + i + ":");

        if (this.gamepads[i] === null) {
          console.log("[null]");
          continue;
        }

        if (!this.gamepads[i].connected) {
          console.log("[disconnected]");
          continue;
        }

        console.log("    Index: " + this.gamepads[i].index);
        console.log("    ID: " + this.gamepads[i].id);
        console.log("    Axes: " + this.gamepads[i].axes.length);
        console.log("    Buttons: " + this.gamepads[i].buttons.length);
        console.log("    Mapping: " + this.gamepads[i].mapping);
      }
    }
  }

  private gamepadConnected() {
    window.addEventListener("gamepadconnected", function (e: GamepadEvent) {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
      );

      // get gamepads standard mapping
      if (e.gamepad.mapping == "standard") {
        console.log("Controller has standard mapping");
      } else {
        console.log("Controller does not have standard mapping");
      }

      // Blindly assuming this is connected
      let gp = e.gamepad;

      // Blindly assuming there's a button
      let button = gp.buttons[0];

      if (button.pressed) {
        console.log("Button pressed!");
      } else {
        console.log("Button not pressed");
      }

      console.log("Button value: " + button.value);
    });
  }

  private gamepadDisconnected() {
    window.addEventListener("gamepaddisconnected", function (e) {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
    });
  }
}
