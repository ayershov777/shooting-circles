import * as PIXI from "pixi.js";
import GameControls from "./game-controls";
import WorldObject from "./world-object";

type PlayerDirection =
  | "idle"
  | "up"
  | "left"
  | "down"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

enum PlayerSpeed {
  IDLE = 0,
  WALK = 4,
  RUN = 6,
}

export default class Player extends WorldObject {
  private gameControls: GameControls;
  private direction: PlayerDirection = "idle";
  private speed: PlayerSpeed = PlayerSpeed.IDLE;

  constructor(app: PIXI.Application, gameControls: GameControls) {
    super(app);
    this.gameControls = gameControls;
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

  update() {
    this.updateControl();
    this.updateMovement();
  }

  updateControl() {
    const isMoveUpKeyDown = this.gameControls.isControlActive("moveUp");
    const isMoveLeftKeyDown = this.gameControls.isControlActive("moveLeft");
    const isMoveDownKeyDown = this.gameControls.isControlActive("moveDown");
    const isMoveRightKeyDown = this.gameControls.isControlActive("moveRight");

    if (isMoveUpKeyDown && isMoveLeftKeyDown && isMoveRightKeyDown) {
      this.direction = "up";
    } else if (isMoveLeftKeyDown && isMoveUpKeyDown && isMoveDownKeyDown) {
      this.direction = "left";
    } else if (isMoveDownKeyDown && isMoveLeftKeyDown && isMoveRightKeyDown) {
      this.direction = "down";
    } else if (isMoveRightKeyDown && isMoveUpKeyDown && isMoveDownKeyDown) {
      this.direction = "right";
    } else if (isMoveUpKeyDown && isMoveLeftKeyDown) {
      this.direction = "up-left";
    } else if (isMoveUpKeyDown && isMoveRightKeyDown) {
      this.direction = "up-right";
    } else if (isMoveDownKeyDown && isMoveLeftKeyDown) {
      this.direction = "down-left";
    } else if (isMoveDownKeyDown && isMoveRightKeyDown) {
      this.direction = "down-right";
    } else if (isMoveUpKeyDown) {
      this.direction = "up";
    } else if (isMoveLeftKeyDown) {
      this.direction = "left";
    } else if (isMoveDownKeyDown) {
      this.direction = "down";
    } else if (isMoveRightKeyDown) {
      this.direction = "right";
    } else {
      this.direction = "idle";
    }

    if (
      !isMoveUpKeyDown &&
      !isMoveLeftKeyDown &&
      !isMoveDownKeyDown &&
      !isMoveRightKeyDown
    ) {
      this.speed = PlayerSpeed.IDLE;
    }
    // else if (isRunKeyPressed) {
    //   this.speed = PlayerSpeed.RUN;
    // }
    else {
      this.speed = PlayerSpeed.WALK;
    }
  }

  updateMovement() {
    // console.log(this.direction);
    switch (this.direction) {
      case "up": {
        this.setYSpeed(this.speed * Math.sin((6 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((6 * Math.PI) / 4));
        break;
      }
      case "up-left": {
        this.setYSpeed(this.speed * Math.sin((5 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((5 * Math.PI) / 4));
        break;
      }
      case "left": {
        this.setYSpeed(this.speed * Math.sin((4 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((4 * Math.PI) / 4));
        break;
      }
      case "down-left": {
        this.setYSpeed(this.speed * Math.sin((3 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((3 * Math.PI) / 4));
        break;
      }
      case "down": {
        this.setYSpeed(this.speed * Math.sin((2 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((2 * Math.PI) / 4));
        break;
      }
      case "down-right": {
        this.setYSpeed(this.speed * Math.sin(Math.PI / 4));
        this.setXSpeed(this.speed * Math.cos(Math.PI / 4));
        break;
      }
      case "right": {
        this.setYSpeed(this.speed * Math.sin((0 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((0 * Math.PI) / 4));
        break;
      }
      case "up-right": {
        this.setYSpeed(this.speed * Math.sin((7 * Math.PI) / 4));
        this.setXSpeed(this.speed * Math.cos((7 * Math.PI) / 4));
        break;
      }
      case "idle": {
        this.setYSpeed(0);
        this.setXSpeed(0);
        break;
      }
    }

    this.entity.x += this.getXSpeed();
    this.entity.y += this.getYSpeed();
  }
}
