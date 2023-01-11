export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

// // ./pages/index.js
// const cardsList = new Section(
//   {
//     data: messageList,
//     renderer: (messageItem) => {
//       // Обратите внимание на параметр messageItem
//       const message = messageItem.isOwner
//         ? new UserMessage(messageItem, ".message-template_type_user")
//         : new DefaultMessage(messageItem, ".message-template_type_default");

//       const messageElement = message.generate();

//       cardsList.setItem(cardElement);
//     },
//   },
//   cardListSection
// );

// cardsList.renderItems();
