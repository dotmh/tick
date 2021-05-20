import Timeout = NodeJS.Timeout;

const ms = require('ms');

export class Tick {

  private _tick: boolean;
  private _time: number;
  private _timeOutId?: Timeout;
  private _condition: ()=> boolean;

  constructor() {
    this._tick = false;
    this._time = 1000;
    this._condition = () => true;
  }

  get time(): string {
    return ms(this._time);
  }

  get mTime(): number | null {
    return this._time;
  }

  get lTime(): string {
    return ms(this._time, {long: true});
  }
  
  every(time: number): Tick {
    this._time = +ms(time);
    return this;
  }

  when(condition: () => boolean): Tick {
    this._condition = condition;
    return this;
  }

  start(callback: () => any): void{
    this._tick = true;
    this.tick(callback);
  }

  stop(): void {
    if (this._timeOutId) {
      clearTimeout(this._timeOutId);
    }
    this._tick = false;
  }

  private tick(callback?: () => any) {
    if (this._tick) {
      if (this._condition !== null && this._condition()) {
        if (typeof callback === 'function') {
          callback();
        } else {
          throw new TypeError('Callback must be a function');
        }

        this._timeOutId = setTimeout(() => this.tick(callback), this._time);
      }
    }
  }
}
