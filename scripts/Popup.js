export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));

    document.addEventListener("keyup", this._handleEscClose.bind(this));

    this._popup.addEventListener("click", this._handleClickClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }
}
