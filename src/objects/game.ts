import * as PIXI from "pixi.js";
import KeyboardControls from "./keyboard-controls";
import Player from "./player";
import World from "./world";

export default class Game {
  private app: PIXI.Application;
  private keyboardControls: KeyboardControls;
  private player: Player;
  private world: World;

  constructor() {
    this.app = new PIXI.Application();
    this.player = new Player(this.app);
    this.keyboardControls = new KeyboardControls(this.player);
    this.world = new World(this.app);

    this.initWorld();
    this.setup();
  }

  private initWorld() {
    this.world.addObject(this.player);
  }

  private setup() {
    document.body.appendChild(this.app.view);

    // initiate game loop
    this.app.ticker.add((delta) => this.gameLoop(delta));
  }

  private gameLoop(delta: number) {}
}
