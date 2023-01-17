export default class UserInfo {
  constructor(userName, about) {
    this._userName = document.querySelector(userName)
    this._about = document.querySelector(about)
  }

  getUserInfo() {
    // const userInfo = {}
    // userInfo.userName = this._userName.textContent
    // userInfo.about = this._about.textContent
    // return userInfo
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
