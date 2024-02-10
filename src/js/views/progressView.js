import View from "./View.js";

class ProgressView extends View {
  _parentElement = document.querySelector(".progress__container__list");
  _message = "You have no progress yet";

  // prettier-ignore
  _generateMarkup() {
    return `
        <ul class="progress__list">
            ${this._data
              .map((el) => {
                return `
                    <li class="progress__list__item">
                        <div class="progress__circle__outer" style="background: ${(el.finishedTasks / el.totalTasks) * 100 === 100 ? `conic-gradient(${el.color} 0% 100%)` : `conic-gradient(${el.color} 0% ${(el.finishedTasks / el.totalTasks) * 100}%, #888 ${(el.finishedTasks / el.totalTasks) * 100}% 100%)`}">
                            <div class="progress__circle__inner">
                                <span class="progress__circle__span">${
                                  Math.ceil((el.finishedTasks / el.totalTasks) * 100)
                                }%</span>
                            </div>
                        </div>
                        <div class="progress__list__item__spans">
                            <span class="progress__list__item__span progress__list__item__span--big">${
                              el.categoryName.includes("-")
                                ? (
                                    el.categoryName[0].toUpperCase() +
                                    el.categoryName.slice(1)
                                  )
                                    .split("-")
                                    .join(" ")
                                : el.categoryName[0].toUpperCase() +
                                  el.categoryName.slice(1)
                            }</span>
                            <span class="progress__list__item__span progress__list__item__span--small">Completed: ${
                              el.finishedTasks
                            }/${el.totalTasks}</span>
                        </div>
                    </li>
                `;
              })
              .join("")}
        </ul>
    `;
  }

  _generateMessage() {
    return `
        <div class="container__message">
            <span class="message">${this._message}</span>
        </div>
  `;
  }
}

export default new ProgressView();
