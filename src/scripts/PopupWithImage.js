import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._description = this._popup.querySelector(".popup__image-title");
  }

  open(title, path) {
    this._image.src = path;
    this._image.alt = title;
    this._description.textContent = title;
    super.open();
  }
}
