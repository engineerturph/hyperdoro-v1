class clock {
  _parentElement = document.querySelector(".counterBox");
  _status = document.querySelector(".calisma");
  _counter = document.querySelector(".counter");
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
