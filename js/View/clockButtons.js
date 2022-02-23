class clockButtons {
  _plusButton = document.querySelector(".plusButton1");
  _nextButton = document.querySelector(".nextButton");
  _minusButton = document.querySelector(".minusButton1");

  listenPlus(func) {
    this._plusButton.addEventListener("click", function () {
      func();
    });
  }
  listenNext(func) {
    this._nextButton.addEventListener("click", function () {
      func();
    });
  }
  listenMinus(func) {
    this._minusButton.addEventListener("click", function () {
      func();
    });
  }
}

export default new clockButtons();
