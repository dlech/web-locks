export class HeartBeat {
  private _key: string;
  private _heartBeatIntervalTime: number;
  private _heartBeatDetectIntervalTime: number;
  private _intervalId: null | ReturnType<typeof setTimeout> = null;
  constructor({
    key,
    heartBeatIntervalTime = 1000,
    heartBeatDetectIntervalTime = 1000 * 2,
  }: {
    key: string;
    heartBeatIntervalTime?: number;
    heartBeatDetectIntervalTime?: number;
  }) {
    this._key = key;
    this._heartBeatIntervalTime = heartBeatIntervalTime;
    this._heartBeatDetectIntervalTime = heartBeatDetectIntervalTime;
    window.addEventListener("unload", () => {
      this.destroy();
    });
  }

  start() {
    this._intervalId = setInterval(() => {
      console.log("heartBeat====");
      this._setLocalTime();
    }, this._heartBeatIntervalTime);
  }

  destroy() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  private _setLocalTime() {
    window.localStorage.setItem(this._key, Date.now().toString());
  }

  detect(cb: () => void) {
    this._intervalId = setInterval(() => {
      console.log("detectHearBeat===");
      cb();
    }, this._heartBeatDetectIntervalTime);
  }
}
