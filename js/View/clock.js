class clock {
  _parentElement = document.querySelector(".counter");
  _time;
  _timeText = this._parentElement.textContent;
  started = false;

  calculateTime() {
    const times = this._parentElement.textContent.split(":");
    this._time = +times[1] + +times[0] * 60;
  }
  translateTime(time) {
    const times = [
      `${Math.floor(time / 60)}`.padStart(2, 0),
      `${time % 60}`.padStart(2, 0),
    ];
    return times.join(":");
  }
  _clockWork() {
    this._time--;
    this._timeText = this.translateTime(this._time);
    this._parentElement.textContent = this._timeText;
  }
  startClock() {
    setInterval(this._clockWork.bind(this), 1000);
    this.started = true;
  }
  stopClock() {}
  constructor() {
    this.calculateTime();
    // super();//ilerde bu classi baska classtan cekersen this ona kaymasin diye bunu kullan
  }
}

export default new clock(); //bu tanimlamiyor sadece exportluyor
