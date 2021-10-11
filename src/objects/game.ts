import * as PIXI from "pixi.js";

export default class Game() {
    private app: PIXI.Application;
    private keyboard: Keyboard;
  
    constructor() {
        this.app = PIXI.Application();
        this.keyboard = new Keyboard();
        this.setup();
    }

    private setup() {
        document.body.appendChild(this.app.view);

        // set up world
        this.app.stage.addChild(playerEntity);

        // initiate game loop
        this.app.ticker.add((delta) => gameLoop(delta));
    }
  
    private gameLoop(delta: number) {

    }
}
