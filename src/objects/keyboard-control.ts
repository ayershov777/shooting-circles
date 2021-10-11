export default class KeyboardControl {
    private value: string;
    private isDown: boolean;
    private isUp: boolean;
    private press: () => void;
    private release: () => void;

    constructor(
        value: string,
        press: () => void,
        release: () => void
    ) {
        this.value = value;
        this.isDown = false;
        this.isUp = true;
        this.press = press;
        this.release = release;
        this.initEventListeners();
    }

    private initEventListeners() {
        window.addEventListener("keydown", this.downHandler, false);
        window.addEventListener("keyup", this.upHandler, false);
    }

    public downHandler(event: KeyboardEvent) {
        if (event.key === this.value) {
            if (this.isUp) {
                this.press();
            }
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    }

    public upHandler(event: KeyboardEvent) {
        if (event.key === this.value) {
            if (this.isDown) {
              this.release();
            }
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    }
}
