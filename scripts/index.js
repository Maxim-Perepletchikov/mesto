const popupElement = document.querySelector(".popup");
const popupEditButtonElement = document.querySelector(".profile__edit");
const popupCloseButtonElement = popupElement.querySelector(
  ".form__close-button"
);
const popupEditClose = [popupEditButtonElement, popupCloseButtonElement];

const profileTitleName = document.querySelector(".profile__title-name");
const profileProfession = document.querySelector(".profile__profession");

const likeElement = document.querySelectorAll(".card__like");

likeElement.forEach((elem) =>
  elem.addEventListener("click", () =>
    elem.classList.toggle("card__like_active")
  )
);

popupEditClose.forEach((elem) =>
  elem.addEventListener("click", () => {
    popupElement.classList.toggle("popup_opened");
    nameInput.value = profileTitleName.textContent;
    jopInput.value = profileProfession.textContent;
  })
);

// ===============Form

const formElement = document.querySelector(".form");
const formInput = formElement.querySelectorAll(".form__input");

const nameInput = formInput[0];
const jopInput = formInput[1];

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileProfession.textContent = jopInput.value;
  popupElement.classList.toggle("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
