export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._title = data.cardName;
    this._path = data.path;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._cardImage = this._card.querySelector(".card__image");
    this._cardTitle = this._card.querySelector(".card__title");
    this._setEventListeners();

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._path;
    this._cardImage.alt = this._title;

    return this._card;
  }

  _setEventListeners() {
    this._buttonDelete = this._card.querySelector(".card__delete-button");
    this._buttonLike = this._card.querySelector(".card__like");

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._title, this._path);
    });

    this._buttonLike.addEventListener("click", () => this._handleLikeClick());
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  }
}
