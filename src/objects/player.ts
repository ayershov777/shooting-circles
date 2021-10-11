import * as PIXI from "pixi.js";
import WorldObject from "./world-object";

export default class Player extends WorldObject {
  private hp: number;

  constructor(app: PIXI.Application) {
    super(app);
    this.hp = 100;
  }

  initGraphics() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(30, 30, 30, 30);
    graphics.endFill();

    graphics.x = this.app.renderer.width / 2;
    graphics.y = this.app.renderer.height / 2;

    return graphics;
  }

  up() {
    this.entity.y -= 1;
  }

  down() {
    this.entity.y += 1;
  }

  left() {
    this.entity.x -= 1;
  }

  right() {
    this.entity.x += 1;
  }
}
