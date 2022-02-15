class switcher {
  _parentElement = document.querySelector(".switch");
  target = document.querySelector(".finishedBox"); //(donelist)

  listenSwitcher(func) {
    this._parentElement.addEventListener("click", function () {
      func();
    });
  }
}

export default new switcher();
