export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(res, userInfo) {
    res.forEach((item) => {
      this._renderer({...item, ownerId: userInfo.id});
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrep(element) {
    this._container.prepend(element);
  }

}
