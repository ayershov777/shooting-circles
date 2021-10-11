import Player from "./player";

type Control = "moveUp" | "moveDown" | "moveLeft" | "moveRight";

type KeyConfig = Record<Control, string>;

type GameControlsOptions = {
    keyConfig?: Partial<KeyConfig>;
}

const DEFAULT_CONTROL_CONFIG = {
    "moveUp": "w",
    "moveLeft": "a",
    "moveDown": "s",
    "moveRight": "d",
};

export default class KeyboardControls {
    private player: Player;
    private keyConfig: KeyConfig;
    
    constructor(player: Player, options?: GameControlsOptions) {
        this.player = player;
        this.keyConfig = { ...DEFAULT_CONTROL_CONFIG, ...options?.keyConfig };
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
    
    // keyDown handlers
    private moveUpDown = () => {
        console.log(`${this.keyConfig.moveUp} key down`);
        this.player.up();
    };

    private moveLeftDown = () => {
        console.log(`${this.keyConfig.moveLeft} key down`);
        this.player.left();
    };

    private moveDownDown = () => {
        console.log(`${this.keyConfig.moveDown} key down`);
        this.player.down();
    };

    private moveRightDown = () => {
        console.log(`${this.keyConfig.moveRight} key down`);
        this.player.right();
    };

    // keyUp handlers
    private moveUpUp = () => {
        console.log(`${this.keyConfig.moveUp} key up`);
    };

    private moveLeftUp = () => {
        console.log(`${this.keyConfig.moveLeft} key up`);
    };

    private moveDownUp = () => {
        console.log(`${this.keyConfig.moveDown} key up`);
    };

    private moveRightUp = () => {
        console.log(`${this.keyConfig.moveRight} key up`);
    };
}