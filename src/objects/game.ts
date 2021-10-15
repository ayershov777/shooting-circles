import * as PIXI from "pixi.js";
import GameControls from "./game-controls";
import Player from "./player";
import World from "./world";

export default class Game {
  private app: PIXI.Application;
  private gameControls: GameControls;
  private player: Player;
  private world: World;
  private gamepads: Gamepad[];

  constructor() {
    this.app = new PIXI.Application();
    this.gameControls = new GameControls();
    this.player = new Player(this.app, this.gameControls);
    this.world = new World(this.app);
    // @ts-ignore
    this.gamepads = navigator.getGamepads();

    this.initWorld();
    this.initGraphics();
  }

  private initWorld() {
    this.world.addObject(this.player);
  }

  private initGraphics() {
    document.body.appendChild(this.app.view);
    
    // initiate game loop
    this.app.ticker.add((delta) => this.gameLoop(delta));
  }

  private gameLoop(delta: number) {
    this.player.update();
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

  
}
