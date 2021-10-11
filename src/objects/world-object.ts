import * as PIXI from "pixi.js";

export default abstract class WorldObject {
  protected app: PIXI.Application;
  protected entity: PIXI.Graphics;

  private ySpeed: number = 0;
  private xSpeed: number = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.entity = this.initGraphics();
  }

  protected abstract initGraphics(): PIXI.Graphics;

  protected abstract update(): void;

  public getEntity() {
    return this.entity;
  }

  public setXSpeed(xSpeed: number) {
    this.xSpeed = xSpeed;
  }

  public setYSpeed(ySpeed: number) {
    this.ySpeed = ySpeed;
  }

  public getXSpeed() {
    return this.xSpeed;
  }

  public getYSpeed() {
    return this.ySpeed;
  }
}
