class FiltersView {
  _parentElement = document.querySelector(".tasks__filters");

  addHandlerFilters(handler) {
    this._parentElement
      .querySelector(".tasks__filters__secondary")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const category = document.querySelector(
          ".tasks__filters__secondary__select--category"
        );
        const sort = document.querySelector(
          ".tasks__filters__secondary__select--sort"
        );

        handler(category.value, sort.value);

        category.selectedIndex = sort.selectedIndex = 0;
      });
  }

  addHandlerAllTasks(handler) {
    const eventHandler = function (e) {
      const btn = e.target.closest(".tasks__button--all");

      if (!btn) return;

      this._animationHandler(btn);

      document
        .querySelector(".tasks__filters__secondary")
        .classList.remove("tasks__filters__secondary--hidden");

      handler();
    };

    this._parentElement.addEventListener("click", eventHandler.bind(this));
  }

  addHandlerFinishedTasks(handler) {
    const eventHandler = function (e) {
      const btn = e.target.closest(".tasks__button--finished");

      if (!btn) return;

      this._animationHandler(btn);

      document
        .querySelector(".tasks__filters__secondary")
        .classList.add("tasks__filters__secondary--hidden");

      handler();
    };

    this._parentElement.addEventListener("click", eventHandler.bind(this));
  }

  changeFilterButton() {
    const buttons = document.querySelectorAll(".tasks__button");

    buttons.forEach((btn) => btn.classList.remove("tasks__button--active"));

    document
      .querySelector(".tasks__button--all")
      .classList.add("tasks__button--active");

    document
      .querySelector(".tasks__filters__secondary")
      .classList.remove("tasks__filters__secondary--hidden");
  }

  _animationHandler(btn) {
    const buttons = document.querySelectorAll(".tasks__button");

    buttons.forEach((btn) => btn.classList.remove("tasks__button--active"));

    btn.classList.add("tasks__button--active");
  }
}

export default new FiltersView();
