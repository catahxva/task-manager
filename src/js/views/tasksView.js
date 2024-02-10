import View from "./View.js";

class TasksView extends View {
  _parentElement = document.querySelector(".tasks__container__grid");
  _message = "You have no tasks yet";
  _errorMessage = "There were no tasks found based on these filters";

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerFinish(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".tasks__item__button--finish");

      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".tasks__item__button--delete");

      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  addHandlerDeleteFinished(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".tasks__item__button--delete-finish");

      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  _generateMarkup() {
    return `
        <div class="tasks__grid">
            ${this._data
              .map((el) => {
                return `
                    <div class="tasks__item ${
                      el.finished ? "tasks__item--finished" : ""
                    }">
                        <span class="tasks__item__type tasks__item__type--${
                          el.type
                        }">
                            ${el.type}
                        </span>
                        <h3 class="tasks__item__title">
                            ${el.title}
                        </h3>
                        <p class="tasks__item__description">
                            ${el.description}
                        </p>
                        <span class="tasks__item__date ${
                          el.finished ? "" : "margin--bottom"
                        }">Due: ${el.date}</span>
                        ${
                          el.finished
                            ? `
                            <span class="tasks__item__date margin--bottom">Finished: ${el.finishedDate}</span>
                        `
                            : `

                        `
                        }
                        <div class="tasks__item__container__controlls">
                            ${
                              el.finished
                                ? `
                            <button class="tasks__item__button tasks__item__button--delete-finish" data-id="${el.id}">Delete</button>
                            `
                                : `
                            <button class="tasks__item__button tasks__item__button--finish" data-id="${el.id}">Finish</button>
                            <button class="tasks__item__button tasks__item__button--delete" data-id="${el.id}">Delete</button>
                            `
                            }
                        </div>
                    </div>
                `;
              })
              .join("")}
        </div>
    `;
  }

  _generateMessage() {
    return `
      <div class="container__message">
          <span class="message">${this._message}</span>
      </div>
    `;
  }

  _generateErrorMessage() {
    return `
      <div class="container__message">
          <span class="message">${this._errorMessage}</span>
      </div>
    `;
  }
}

export default new TasksView();
