export default class Card {
  constructor(title, path, cardSelector) {
    this._title = title;
    this._path = path;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".card__title").textContent = this._title;
    this._card.querySelector(".card__image").src = this._path;
    this._card.querySelector(".card__image").alt = this._title;

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._card.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick();
    });

    this._card
      .querySelector(".card__like")
      .addEventListener("click", this._toggleLike);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._card.remove();
  }

  _handleImageClick() {
    openPopup(popupImage);
    popupFullImage.src = this._path;
    popupFullImage.alt = this._title;
    popupImageTitle.textContent = this._title;
  }
}
