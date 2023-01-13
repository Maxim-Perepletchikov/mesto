import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._handleSubmitForm = callback;
  }

  _getInputValues() {}
}
