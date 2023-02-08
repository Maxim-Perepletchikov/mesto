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

  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._about.textContent = about;
    this._avatar = avatar;
    this.id = _id
  }
}
