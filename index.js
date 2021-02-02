const ms = require('ms');

class Tick {
  constructor() {
    this._tick = false;
    this._time = 1000;
    this._timeOutId = null;
    this._condition = () => true;
  }

  get time(long = false) {
    return ms(this._time, {long});
  }

  get mTime() {
    return this._time;
  }
  
  every(time) {
    this._time = ms(time);
    return this;
  }

  when(callback) {
    this._condition = callback;
    return this;
  }

  start(callback) {
    this._tick = true;
    this.tick(callback);
  }

  stop() {
    clearTimeout(this._timeOutId);
    this._tick = false;
  }

  tick(callback) {
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

module.exports = Tick;
