class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name || "Untitled";
    this._link = cardData.link || "";
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._likeButton.classList.toggle("card__like-button_active")
    );

    this._deleteButton.addEventListener("click", () =>
      this._cardElement.remove()
    );

    this._image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._image = this._cardElement.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._description = this._cardElement.querySelector(".card__title");
    this._description.textContent = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
