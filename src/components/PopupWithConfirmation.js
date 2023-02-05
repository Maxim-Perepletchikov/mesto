import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm
  }

  setEventListeners() {
    super.setEventListeners();
    // this._form.addEventListener("submit", (evt) => {
    //   evt.preventDefault();

    //   this._handleSubmitForm();
    // });
  }
}
