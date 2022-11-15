// Popup
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(
  ".form__close-button"
);

// Profile
const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");
const popupEditButtonElement = document.querySelector(".profile__edit");

// Form
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector("#nameInput");
const jobInput = formElement.querySelector("#jobInput");

// Слушатель кнопки редактирования
popupEditButtonElement.addEventListener("click", () => {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileProfession.textContent;
});

// Слушатель кнопки закрытия popup
popupCloseButtonElement.addEventListener("click", closePopup);

// Слушатель формы на отправку данных
formElement.addEventListener("submit", formSubmitHandler);

// Функция сохранения
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

// Функция закрытия popup
function closePopup() {
  popupElement.classList.remove("popup_opened");
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
