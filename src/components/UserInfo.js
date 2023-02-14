export default class UserInfo {
  constructor({userNameSelector, aboutSelector, avatarSelector}) {
    this._userName = document.querySelector(userNameSelector)
    this._about = document.querySelector(aboutSelector)
    this._avatar = document.querySelector(avatarSelector)

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
    this._avatar.src = avatar;
    this.id = _id
  }
}
