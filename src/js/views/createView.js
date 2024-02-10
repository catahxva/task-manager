class CreateView {
  _parentElement = document.querySelector(".create__form");
  _title = document.querySelector(".create__form__input--title");
  _description = document.querySelector(".create__form__textarea--description");
  _type = document.querySelector(".create__form__input--select");
  _date = document.querySelector(".create__form__input--date");

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      handler();
    });
  }

  getTaskData() {
    const taskData = {
      title: this._title.value[0].toUpperCase() + this._title.value.slice(1),
      description:
        this._description.value[0].toUpperCase() +
        this._description.value.slice(1),
      type: this._type.value,
      date: this._date.value,
    };

    this._clearInput();

    return taskData;
  }

  showNotification() {
    const notification = document.querySelector(".notification");
    notification.classList.add("notification--active");

    setTimeout(
      () => notification.classList.remove("notification--active"),
      3000
    );
  }

  _clearInput() {
    this._type.selectedIndex = 0;

    this._title.value = this._description.value = this._date.value = "";
  }
}

export default new CreateView();
