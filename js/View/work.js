class work {
  _parentElement = document.querySelector(".tasks");
  input = this._parentElement.querySelector(".workInput");
  _list = this._parentElement.querySelector(".workList");
  _button = this._parentElement.querySelector(".plusButton");
  _work;
  _data;
  _markup;

  listenButton(func) {
    this._button.addEventListener("click", function (e) {
      e.preventDefault();
      func();
    });
  }
  getValue(el) {
    return el.value;
  }
  renderList(html) {
    this._list.innerHTML = "";
    this._list.insertAdjacentHTML("afterbegin", html);
  }
  generateList(data) {
    this._data = data;
    this._markup = data
      .map(
        (a, i) =>
          `<div class="workList work_${i}"><div class="workText">${a}<button class="addPomodoro">0<button/></div></div><hr/>`
      )
      .join("");
    return this._markup;
  }
}

export default new work();
