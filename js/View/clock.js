class clock {
  _parentElement = document.querySelector(".counterBox");
  _status = document.querySelector(".calisma");
  _counter = document.querySelector(".counter");
  _realTimer = document.querySelector(".clock");
  generateTimerMarkup(data) {
    return `${data.hours.padStart(2, 0)}:${data.minutes.padStart(2, 0)}`;
  }
  renderRealTime(data) {
    this._realTimer.innerHTML = "";
    this._realTimer.insertAdjacentHTML(
      "beforeend",
      this.generateTimerMarkup(data)
    );
  }
  renderTime(time) {
    this._counter.textContent = time;
  }
  renderStatus(status) {
    this._status.textContent = status;
  }
  startHandler(func) {
    this._parentElement
      .querySelector(".startButton")
      .addEventListener("click", function () {
        func();
      });
  }
  toggleStart() {
    const button = this._parentElement.querySelector(".startText");
    if (button.innerHTML === "Start") {
      button.innerHTML = "Stop";
    } else {
      button.innerHTML = "Start";
    }
  }
}

export default new clock(); //bu tanimlamiyor sadece exportluyor
