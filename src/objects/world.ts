import * as PIXI from "pixi.js";
import WorldObject from "./world-object";

export default class World {
    private app: PIXI.Application;
    
    constructor(app: PIXI.Application) {
        this.app = app;
    }

    public addObject(obj: WorldObject) {
        const entity = obj.getEntity();
        this.app.stage.addChild(entity);
    }
    
}