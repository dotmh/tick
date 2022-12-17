import ms from 'ms';

export type Condition = () => boolean;
export type Callback = () => void;

export class Tick {

  private _tick: boolean = false;
  private _time: number = 1000;
  private _timeOutId?: number;
  private _condition: Condition = () => true;

  get time(): string {
    return ms(this._time);
  }

  get mTime(): number | null {
    return this._time;
  }

  get lTime(): string {
    return ms(this._time, { long: true });
  }

  every(timeString: string): Tick {
    this._time = Number(ms(timeString));
    return this;
  }

  when(condition: Condition): Tick {
    this._condition = condition;
    return this;
  }

  start(callback: Callback): void {
    this._tick = true;
    this.tick(callback);
  }

  stop(): void {
    if (this._timeOutId) {
      clearTimeout(this._timeOutId);
    }
    this._tick = false;
  }

  private tick(callback: Callback) {
    if (this._tick) {
      if (this._condition !== null && this._condition()) {
        callback();
        this._timeOutId = setTimeout(() => this.tick(callback), this._time);
      }
    }
  }
}
