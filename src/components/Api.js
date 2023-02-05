export default class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-59/cards", {
      headers: {
        authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setCard({ name, link }) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-59/cards", {
      method: "POST",
      headers: {
        authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setInfoProfile({ name, about }) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-59/users/me", {
      method: "PATCH",
      headers: {
        authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInfoProfile() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-59/users/me", {
      headers: {
        authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-59/cards/likes/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-59/cards/likes/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "30812f22-45b0-4eb1-a698-1f92d9f66ac5",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
