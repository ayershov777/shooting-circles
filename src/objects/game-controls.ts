import GamepadConnector from "./gamepad-connector";

export type ControlName = "moveUp" | "moveDown" | "moveLeft" | "moveRight";

type KeyboardConfig = Record<ControlName, string>;

enum GamepadAxis {
  LEFT_X,
  LEFT_Y,
  RIGHT_X,
  RIGHT_Y,
}

export type ControlState = {
  isActive: boolean;
};

export type GameControlsState = Record<ControlName, ControlState>;

type GameControlsOptions = {
  keyConfig?: Partial<KeyboardConfig>;
};

const DEFAULT_CONTROL_CONFIG = {
  moveUp: "w",
  moveLeft: "a",
  moveDown: "s",
  moveRight: "d",
};

export const INITIAL_KEYBOARD_STATE = Object.keys(
  DEFAULT_CONTROL_CONFIG
).reduce(
  (acc, controlName) => ({ ...acc, [controlName]: { isActive: false } }),
  {} as GameControlsState
);

export default class GameControls {
  private keyConfig: KeyboardConfig;
  private state: GameControlsState;
  private gamepadConnector: GamepadConnector;
  private detectGamepadControl: Record<ControlName, () => boolean>;
  private interval: any;

  constructor(options?: GameControlsOptions) {
    this.keyConfig = { ...DEFAULT_CONTROL_CONFIG, ...options?.keyConfig };
    this.state = INITIAL_KEYBOARD_STATE;
    this.gamepadConnector = new GamepadConnector();
    this.detectGamepadControl = this.getDetectGamepadControl();
    this.mountListeners();
    this.interval = setInterval(this.pollGamepads, 500);
  }

  private getDetectGamepadControl() {
    return {
      ["moveUp"]: this.isMoveUpActiveOnController,
      ["moveDown"]: this.isMoveDownActiveOnController,
      ["moveLeft"]: this.isMoveLeftActiveOnController,
      ["moveRight"]: this.isMoveRightActiveOnController,
    };
  }

  private mountListeners() {
    const keyDownMap = {
      [this.keyConfig.moveUp]: this.moveUpDown,
      [this.keyConfig.moveLeft]: this.moveLeftDown,
      [this.keyConfig.moveDown]: this.moveDownDown,
      [this.keyConfig.moveRight]: this.moveRightDown,
    };

    const keyUpMap = {
      [this.keyConfig.moveUp]: this.moveUpUp,
      [this.keyConfig.moveLeft]: this.moveLeftUp,
      [this.keyConfig.moveDown]: this.moveDownUp,
      [this.keyConfig.moveRight]: this.moveRightUp,
    };

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const keyDownHandler = keyDownMap[e.key];

      if (keyDownHandler) {
        keyDownHandler();
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const keyUpHandler = keyUpMap[e.key];

      if (keyUpHandler) {
        keyUpHandler();
      }
    });
  }

  private pollGamepads() {
    let gamepads = navigator.getGamepads();
    /* for (var i = 0; i < gamepads.length; i++) {
      var gp = gamepads[i];
      if (gp) {
        console.log(`"Gamepad connected at index ${gp.index} : ${ gp.id}. It has ${gp.buttons.length} buttons and ${gp.axes.length} axes.`) ;
        clearInterval(this.interval);
      }
    } */
  }

  public isControlActive(controlName: ControlName) {
    const gamepad = this.gamepadConnector.getGamepad();

    if (gamepad) {
      return this.detectGamepadControl[controlName]();
    }

    return this.state[controlName].isActive;
  }

  // gamepad command detection
  private isMoveUpActiveOnController() {
    const gamepad = this.gamepadConnector.getGamepad();
    return !!gamepad && gamepad.axes[GamepadAxis.LEFT_Y] < 0;
  }

  private isMoveLeftActiveOnController() {
    const gamepad = this.gamepadConnector.getGamepad();
    return !!gamepad && gamepad.axes[GamepadAxis.LEFT_X] < 0;
  }

  private isMoveDownActiveOnController() {
    const gamepad = this.gamepadConnector.getGamepad();
    return !!gamepad && gamepad.axes[GamepadAxis.LEFT_Y] > 0;
  }

  private isMoveRightActiveOnController() {
    const gamepad = this.gamepadConnector.getGamepad();
    return !!gamepad && gamepad.axes[GamepadAxis.LEFT_X] > 0;
  }

  // keyDown handlers
  private moveUpDown = () => {
    this.state.moveUp.isActive = true;
  };

  private moveLeftDown = () => {
    this.state.moveLeft.isActive = true;
  };

  private moveDownDown = () => {
    this.state.moveDown.isActive = true;
  };

  private moveRightDown = () => {
    this.state.moveRight.isActive = true;
  };

  // keyUp handlers
  private moveUpUp = () => {
    this.state.moveUp.isActive = false;
  };

  private moveLeftUp = () => {
    this.state.moveLeft.isActive = false;
  };

  private moveDownUp = () => {
    this.state.moveDown.isActive = false;
  };

  private moveRightUp = () => {
    this.state.moveRight.isActive = false;
  };
}
