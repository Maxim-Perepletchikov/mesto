export default class UserInfo {
  constructor({userName, about}) {
    this._userName = document.querySelector(userName)
    this._about = document.querySelector(about)
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
