class upperButtons {
  _parentElement = document.querySelector(".topside");

  listenTopSide(func) {
    this._parentElement.addEventListener("click", function (e) {
      func(e);
    });
  }
}

export default new upperButtons();
