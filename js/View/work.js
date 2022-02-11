class work {
  _parentElement = document.querySelector(".tasks");
  _input = this._parentElement.querySelector(".workInput");
  _list = this._parentElement.querySelector(".workList");
  _button = this._parentElement.querySelector(".plusButton");
  _work;
  _data;
  workTarget;

  returnInputValue() {
    return this._input.value;
  }
  listenInputButton(func) {
    this._button.addEventListener("click", function (e) {
      e.preventDefault();
      func();
    });
  }
  listenWorkList(func) {
    this._list.addEventListener(
      "mousedown",
      function (e) {
        func(e);
      }.bind(this)
    );
  }
  listenAddPomodoro(func) {
    this._list.addEventListener(
      "mousedown",
      function (e) {
        func(e);
      }.bind(this)
    );
  }
  _generateMarkup(data) {
    this._data = data;
    return data
      .map(
        (a, i) =>
          `<div class="work ${
            a.continue ? "current" : ""
          }" data-id=${i}><div class="workText">${
            a.value === "" ? "No explanation" : a.value
          }</div><button class="addPomodoro">${
            a.repeat
          }<button/></div><hr class="workhr"/>`
      )
      .join("");
  }
  renderToList(data) {
    this._list.innerHTML = "";
    this._list.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }
}

export default new work();
