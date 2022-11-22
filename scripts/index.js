// Popup
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(
  ".form__close-button"
);

// Profile
const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");
const popupEditButtonElement = document.querySelector(".profile__edit");
const popupAddButtonElement = document.querySelector(".profile__add-button");

// Form
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector("#nameInput");
const jobInput = formElement.querySelector("#jobInput");

// ===================================Попытка клонировать popup))
const container = document.querySelector(".footer");
const popup2 = popupElement.cloneNode(true);
popup2.querySelector(".form__title").textContent = "Новое место";
popup2.querySelector("#nameInput").value = "Название";
popup2.querySelector("#jobInput").value = "Ссылка на картинку";
popup2.querySelector(".form__save-button").textContent = "Создать";
popup2
  .querySelector(".form__close-button")
  .addEventListener("click", () => closePopup(popup2));
container.after(popup2);
// ===================================

// Слушатель кнопки добавить изображение
popupAddButtonElement.addEventListener("click", () => {
  openPopup(popup2);
});

// Слушатель кнопки редактирования
popupEditButtonElement.addEventListener("click", () => {
  openPopup(popupElement);
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
});

// Слушатель кнопки закрытия popup
popupCloseButtonElement.addEventListener("click", () =>
  closePopup(popupElement)
);

// Слушатель формы на отправку данных
formElement.addEventListener("submit", formSubmitHandler);

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция сохранения
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupElement);
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// ===========Like===========
// Элемент кнопки like
// const likeElements = document.querySelectorAll(".card__like");

// Слушатель кнопки Like
// likeElements.forEach((elem) =>
//   elem.addEventListener("click", () =>
//     elem.classList.toggle("card__like_active")
//   )
// );
