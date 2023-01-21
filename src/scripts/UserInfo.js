export default class UserInfo {
  constructor({userNameSelector, aboutSelector}) {
    this._userName = document.querySelector(userNameSelector)
    this._about = document.querySelector(aboutSelector)
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo({userName, about}) {
    this._userName.textContent = userName;
    this._about.textContent = about;
  }
}
