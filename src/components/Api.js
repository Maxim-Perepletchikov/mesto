export default class Api {
  constructor(options) {
    this.options = options
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: {
        authorization: '30812f22-45b0-4eb1-a698-1f92d9f66ac5'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
      })

  }
}
