console.log("TEST");

const state = {
  unfinishedTasks: [],
  finishedTasks: [],
  totalTasks: 0,
};

const finishedTasks = [];
const tasks = [];

const calculateTotalTasks = function () {
  state.totalTasks = state.finishedTasks.length + state.unfinishedTasks.length;
};

const form = document.querySelector(".create__form");

const tasksGrid = document.querySelector(".tasks__grid");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = this.querySelector(".create__form__input--title");
  const description = this.querySelector(
    ".create__form__textarea--description"
  );
  const type = this.querySelector(".create__form__input--select");
  const date = this.querySelector(".create__form__input--date");

  tasks.unshift({
    title: title.value[0].toUpperCase() + title.value.slice(1),
    description: description.value[0].toUpperCase + description.value.slice(1),
    type: type.value,
    date: date.value,
    finished: false,
  });

  console.log(tasks);

  type.selectedIndex = 0;

  title.value = description.value = date.value = "";

  tasksGrid.innerHTML = "";

  const markup = tasks
    .filter((task) => task.finished === false)
    .map((task) => {
      return `
      <div class="tasks__item">
        <span class="tasks__item__type tasks__item__type--${task.type}">
            ${task.type}
        </span>
        <h3 class="tasks__item__title">
            ${task.title}
        </h3>
        <p class="tasks__item__description">
            ${task.description}
        </p>
        <span class="tasks__item__date">Due: ${task.date}</span>
        <div class="tasks__item__container__controlls">
            <button class="tasks__item__button tasks__item__button--finish">Finish</button>
            <button class="tasks__item__button tasks__item__button--delete">Delete</button>
        </div>
      </div>
    `;
    })
    .join("");

  tasksGrid.insertAdjacentHTML("afterbegin", markup);
});
