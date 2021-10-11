import * as PIXI from "pixi.js";

export default class Player {
  private app: PIXI.Application;
  private entity: PIXI.Graphics;
  private hp: number;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.entity = this.initGraphics();
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

  public getEntity() {
    return this.entity;
  }

  up() {
    this.entity.y += 1;
  }

  down() {
    this.entity.y -= 1;
  }

  left() {
    this.entity.x -= 1;
  }

  right() {
    this.entity.x += 1;
  }
}
