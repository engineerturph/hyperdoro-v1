class doneList {
  _parentElement = document.querySelector(".doneList");
  _data;
  _generateMarkup() {
    return this._data
      .map(
        (a) =>
          `<div class="done"><div class="doneText">Work name:${a.value},Time Spend:${a.timeSpend}</div></div><hr/>`
      )
      .join("");
  }
  render(data) {
    this._data = data;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup()
    );
  }
}

export default new doneList();
//`<div class="done"><div class="doneText">Work name:${_data.value},Time Spend:${_data.timeSpend}</div></div><hr/>`
