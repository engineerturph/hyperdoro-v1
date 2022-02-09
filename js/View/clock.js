class clock {
  _parentElement = document.querySelector(".counter");
  _status = document.querySelector(".calisma");
  renderTime(time) {
    this._parentElement.textContent = time;
  }
  renderStatus(status) {
    this._status.textContent = status;
  }
}

export default new clock(); //bu tanimlamiyor sadece exportluyor
