export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage();

    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._insertMarkup(markup);
  }

  renderMessage() {
    const markup = this._generateMessage();

    this._clear();
    this._insertMarkup(markup);
  }

  renderError() {
    const markup = this._generateErrorMessage();

    this._clear();
    this._insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
