class startButton {
  _parentElement = document.querySelector(".startButton");

  startHandler(func) {
    this._parentElement.addEventListener("click", function () {
      func();
    });
  }
}

export default new startButton();
