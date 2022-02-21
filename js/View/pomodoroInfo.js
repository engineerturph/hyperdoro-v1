class pomodoroInfo {
  parentElements = [...document.querySelectorAll(".information")];
  _leftRightInput = document.querySelector(".sagsol");

  listenInput(func) {
    this._leftRightInput.addEventListener("click", function (e) {
      func(e);
    });
  }
  exposeElement(i) {
    this.parentElements.forEach((a) => a.classList.add("hidden"));
    this.parentElements[i].classList.remove("hidden");
  }
}

export default new pomodoroInfo();
