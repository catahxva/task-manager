import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".tasks__pagination");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".tasks__pagination__btn");

      if (!btn) return;

      handler(btn.dataset.page * 1);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(this._data.numberTasks / this._data.perPage);

    //one page, there are more pages
    if (currentPage === 1 && numPages > 1) {
      return `
            <button class="tasks__pagination__btn tasks__pagination__btn--next" data-page="${
              currentPage + 1
            }">
                Next page (${currentPage + 1})
            </button>
        `;
    }

    //last page, there are previous pages
    if (currentPage === numPages && numPages > 1) {
      return `
            <button class="tasks__pagination__btn tasks__pagination__btn--prev" data-page="${
              currentPage - 1
            }">
                Prev page (${currentPage - 1})
            </button>
        `;
    }

    //inbetween pages
    if (currentPage < numPages) {
      return `
            <button class="tasks__pagination__btn tasks__pagination__btn--prev" data-page="${
              currentPage - 1
            }">
                Prev page (${currentPage - 1})
            </button>
            <button class="tasks__pagination__btn tasks__pagination__btn--next" data-page="${
              currentPage + 1
            }">
                Next page (${currentPage + 1})
            </button>
        `;
    }

    //one single plage
    return ``;
  }
}

export default new PaginationView();
