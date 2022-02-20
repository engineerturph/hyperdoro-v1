class work {
  parentElement = document.querySelector(".tasks");
  _input = this.parentElement.querySelector(".workInput");
  list = this.parentElement.querySelector(".workList");
  _button = this.parentElement.querySelector(".plusButton");
  _settings = this.parentElement.querySelector(".settings");
  _work;
  _data;
  workTarget;
  _total = this.parentElement.querySelector(".totalTime");
  returnInputValue() {
    return this._input.value;
  }
  renderTotal(time) {
    this._total.innerHTML = `${time} mins left to finish`;
  }
  listenInputButton(func) {
    this._button.addEventListener("click", function (e) {
      e.preventDefault();
      func();
    });
  }
  listenList(func) {
    this.list.addEventListener("mousedown", function (e) {
      func(e);
    });
  } //click dont work because they are draggable probably
  listenDragWork(func1, func2, func3) {
    this.list.addEventListener("dragstart", function (e) {
      const target = e.target.classList.contains("work")
        ? e.target
        : e.target.parentElement;
      func1(target);
    });
    this.list.addEventListener("dragend", function (e) {
      const target = e.target.classList.contains("work")
        ? e.target
        : e.target.parentElement;
      func3(target);
    });
    this.list.addEventListener("dragover", function (e) {
      func2(e);
    });
  }
  _generateMarkup() {
    return this._data
      .map(
        (a, i) =>
          `<div draggable="true" class="work ${
            a.continue ? "current" : ""
          }" data-id=${i}><div class="workText">${
            a.value === "" ? "No explanation" : a.value
          }</div><input class="valueInput hidden" type="text" name="text" placeholder="${
            a.value === "" ? "No explanation" : a.value
          }"/><button class="addPomodoro">${
            a.repeat
          }</button><div class='remaining'>${
            +a.curRemaining + a.othRemaining
          } mins</div><div class="settings">...</div></div><hr class="workhr"/>`
      )
      .join("");
  }
  renderToList(data) {
    this._data = data;
    this.list.innerHTML = "";
    if (data === []) return;
    this.list.insertAdjacentHTML("afterbegin", this._generateMarkup());
  }
}

export default new work();
