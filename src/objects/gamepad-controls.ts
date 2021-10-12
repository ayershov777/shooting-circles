type KeyName = "moveUp" | "moveDown" | "moveLeft" | "moveRight";

type GamepadConfig = Record<KeyName, string>;

type KeyState = {
    isDown: boolean;
};

type GamepadState = Record<KeyName, KeyState>;

type GamepadControlsOptions = {
    keyConfig?: Partial<GamepadConfig>;
};

const DEFAULT_CONTROL_CONFIG = {
    "moveUp": "w",
    "moveLeft": "a",
    "moveDown": "s",
    "moveRight": "d",
};

const INITIAL_GAMEPAD_STATE = Object.keys(DEFAULT_CONTROL_CONFIG)
    .reduce((acc, keyName) => ({ ...acc, [keyName]: { isDown: false }}), {} as GamepadState);

export default class GamepadControls {
    private keyConfig: GamepadConfig;
    private gamepadState: GamepadState;

    constructor(options?: GamepadControlsOptions) {
        this.keyConfig = { ...DEFAULT_CONTROL_CONFIG, ...options?.keyConfig };
        this.gamepadState = INITIAL_GAMEPAD_STATE;
        this.mountListeners();
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

    public isKeyDown(keyName: KeyName) {
        return this.gamepadState[keyName].isDown;
    }

    // keyDown handlers
    private moveUpDown = () => {
        this.gamepadState.moveUp.isDown = true;
    };

    private moveLeftDown = () => {
        this.gamepadState.moveLeft.isDown = true;
    };

    private moveDownDown = () => {
        this.gamepadState.moveDown.isDown = true;
    };

    private moveRightDown = () => {
        this.gamepadState.moveRight.isDown = true;
    };

    // keyUp handlers
    private moveUpUp = () => {
        this.gamepadState.moveUp.isDown = false;
    };

    private moveLeftUp = () => {
        this.gamepadState.moveLeft.isDown = false;
    };

    private moveDownUp = () => {
        this.gamepadState.moveDown.isDown = false;
    };

    private moveRightUp = () => {
        this.gamepadState.moveRight.isDown = false;
    };
}
