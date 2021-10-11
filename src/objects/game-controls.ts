import KeyboardControl from "./keyboard-control";

export default class GameControls {
    private wKey: KeyboardControl;
    private aKey: KeyboardControl;
    private sKey: KeyboardControl;
    private dKey: KeyboardControl;

    constructor() {
        this.wKey = new KeyboardControl("w", this.pressW, this.releaseW);
        this.aKey = new KeyboardControl("a", this.pressA, this.releaseA);
        this.sKey = new KeyboardControl("s", this.pressS, this.releaseS);
        this.dKey = new KeyboardControl("d", this.pressD, this.releaseD);
    }

    // w key
    private pressW() {
        console.log('pressed w');
    }

    private releaseW() {
        console.log('released w');
    }

    // a key
    private pressA() {
        console.log("pressed a");
    }

    private releaseA() {
        console.log("released a");
    }

    // s key
    private pressS() {
        console.log("pressed s");
    }

    private releaseS() {
        console.log("released s");
    }

    // d key
    private pressD() {
        console.log("pressed d");
    }

    private releaseD() {
        console.log("released d");
    }
}