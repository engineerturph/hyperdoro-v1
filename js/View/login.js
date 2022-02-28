class login {
  _parentElement = document.querySelector(".login");
  _loginButton = document.querySelector(".logIn");
  _signup = this._parentElement.querySelector(".signupButton");
  _signUsername = this._parentElement.querySelector(".username.log");
  _signPassword = this._parentElement.querySelector(".password.log");
  _signInput = this._parentElement.querySelector(".send.log");
  listenLogin(func) {
    this._loginButton.addEventListener("click", function () {
      func();
      console.log(
        this._signup,
        this._signUsername,
        this._signPassword,
        this._signInput
      );
    });
  }
  showLogin() {
    this._parentElement.classList.toggle("hidden");
  }
  listenLoginPage(func) {
    this._signup.addEventListener("click", function (e) {
      func(e);
    });
  }
}

export default new login();
