import * as PIXI from "pixi.js";

export default abstract class WorldObject {
  protected app: PIXI.Application;
  protected entity: PIXI.Graphics;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.entity = this.initGraphics();
  }

  protected abstract initGraphics(): PIXI.Graphics;

  public getEntity() {
    return this.entity;
  }
}
