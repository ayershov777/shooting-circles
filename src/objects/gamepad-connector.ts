export default class GamepadConnector {
  private gamepad?: Gamepad;

  constructor() {
    this.setupGamepad();
  }

  private setupGamepad() {
    const gamepad = navigator.getGamepads()[0];

    this.mountListeners();
  }

  private mountListeners() {
    this.gamepadConnected();
    this.gamepadDisconnected();
  }

  private gamepadConnected() {
    window.addEventListener("gamepadconnected", (e) => {
      console.log("Gamepad Connected\n");
      if (e.gamepad.mapping == "standard") {
        this.gamepad = e.gamepad;
        console.log("    Index: " + this.gamepad.index);
        console.log("    ID: " + this.gamepad.id);
        console.log("    Axes: " + this.gamepad.axes.length);
        console.log("    Buttons: " + this.gamepad.buttons.length);
        console.log("    Mapping: " + this.gamepad.mapping);
      }
    });
  }

  private gamepadDisconnected() {
    window.addEventListener("gamepaddisconnected", () => {
      this.gamepad = undefined;
    });
  }

  public getGamepad() {
    return this.gamepad;
  }
}
