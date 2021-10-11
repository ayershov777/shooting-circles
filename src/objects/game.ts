import * as PIXI from "pixi.js";
import GameControls from "./game-controls";
import Player from "./player";
import World from "./world";

export default class Game {
  private app: PIXI.Application;
  private gameControls: GameControls;
  private player: Player;
  private world: World;

  constructor() {
    this.app = new PIXI.Application();
    this.player = new Player(this.app);
    this.gameControls = new GameControls(this.player);
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
