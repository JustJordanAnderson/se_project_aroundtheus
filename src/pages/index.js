// =================== Imports ===================
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/constants.js";

// =================== DOM Elements ===================
const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["add-card-form"];

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitleInput = document.querySelector("#modal__form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal__form-input-description"
);

// =================== User Info ===================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// =================== Popups ===================
const imagePopup = new PopupWithImage("#modal__preview-popup");

const editProfilePopup = new PopupWithForm(
  "#modal__profile-edit",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
  }
);

const addCardPopup = new PopupWithForm("#modal__add-card", (formData) => {
  const newCard = createCard({
    name: formData.title,
    link: formData.url,
  });
  cardSection.addItem(newCard, true);

  formValidators["add-card-form"].resetValidation();
});

// =================== Validation ===================
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

// =================== Card Helpers ===================
function createCard(data) {
  const card = new Card(data, "#card__template", handleCardClick);
  return card.getView();
}

// =================== Card Section ===================
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  ".cards__list"
);

// =================== Event Handlers ===================
function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

// Open profile edit popup
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;

  formValidators["profile-form"].resetValidation();
  editProfilePopup.open();
});

// Open add card popup
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// =================== Initialize ===================
cardSection.renderItems();

// =================== Set Event Listeners ===================
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
