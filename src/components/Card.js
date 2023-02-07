export default class Card {
  constructor(data, cardSelector, { handleImageClick, handleLikeClick, handleDeleteLikeClick, handleDeleteCard }) {
    this._title = data.name;
    this._path = data.link;
    this._likes = data.likes;
    this.ownerId = data.owner._id;
    this.owner = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick
    this._handleDeleteCard = handleDeleteCard
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
    this.setCounterLikes(this._likes.length);
    this._checkLiked();
    this._checkDeleteCard()

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._path;
    this._cardImage.alt = this._title;

    return this._card;
  }

  _setEventListeners() {
    this._buttonDelete = this._card.querySelector(".card__delete-button");
    this._buttonLike = this._card.querySelector(".card__like");

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._title, this._path);
    });

    this._buttonLike.addEventListener(
      "click",
      () => {
        if (this._card.querySelector('.card__like').classList.contains('card__like_active')) {
          this._deleteLike();
        } else {
          this._like();
        }
      }
    );
  }

  _addLikeIcon() {
    this._buttonLike.classList.add("card__like_active");
  }

  _removeLikeIcon() {
    this._buttonLike.classList.remove("card__like_active");
  }

  _like() {
    this._addLikeIcon();
    this._handleLikeClick();
  }

  _deleteLike() {
    this._removeLikeIcon()
    this._handleDeleteLikeClick()
  }

  setCounterLikes(count) {
    this._card.querySelector(".card__counter-likes").textContent = count;
  }

  _checkLiked() {
    this._likes.forEach((like) => {
      if (like._id === this.owner) this._addLikeIcon();
      // console.log(this.owner);
    });
  }

  _checkDeleteCard() {
    if (this.ownerId !== this.owner) {
      // console.log(this.owner); ???
      this._buttonDelete.remove()
    }
  }

  deleteCard() {
    this._card.remove()
  }

  // _handleDeleteCard() {
  //   this._card.remove();
  //   this._card = null;
  // }
}
