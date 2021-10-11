export default class KeyboardControl {
    private value: string;
    private isDown: boolean;
    private isUp: boolean;

    constructor(value: string, press, release) {
        this.value = value;
        this.isDown = false;
        this.isUp = true;
        this.initEventListeners();
    }

    private initEventListeners() {
        window.addEventListener("keydown", this.downHandler, false);
        window.addEventListener("keyup", this.upHandler, false);
    }

    public downHandler(event: KeyboardEvent) {
        if (event.key === key.value) {
            if (key.isUp) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    }

    public upHandler(event: KeyboardEvent) {
        if (event.key === key.value) {
            if (key.isDown) {
              key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    }

    public press() {

    }

    public release() {

    }
}
