import uniqid from "uniqid";
import * as helpers from "./helpers.js";

export const state = {
  totalTasks: [],
  unfinishedTasks: [],
  finishedTasks: [],
  pagination: {
    page: 1,
    perPage: 10,
  },
  categories: [
    {
      categoryName: "general",
      color: "#3366CC",
      totalTasks: 0,
      finishedTasks: 0,
    },
    {
      categoryName: "ui-design",
      color: "#8E44AD",
      totalTasks: 0,
      finishTasks: 0,
    },
    {
      categoryName: "ux-design",
      color: "#A5694F",
      totalTasks: 0,
      finishedTasks: 0,
    },
    {
      categoryName: "frontend",
      color: "#FFA500",
      totalTasks: 0,
      finishedTasks: 0,
    },
    {
      categoryName: "backend",
      color: "#FF69B4",
      totalTasks: 0,
      finishedTasks: 0,
    },
    {
      categoryName: "graphic-design",
      color: "#FFD700",
      totalTasks: 0,
      finishedTasks: 0,
    },
    {
      categoryName: "copywriting",
      color: "#808000",
      totalTasks: 0,
      finishedTasks: 0,
    },
  ],
};

const persistLocalStorage = function (itemName, itemValue) {
  localStorage.setItem(itemName, itemValue);
};

export const addTask = function (obj) {
  const task = {
    id: uniqid(),
    title: obj.title,
    description: obj.description,
    type: obj.type,
    date: helpers.formatDate(obj.date),
    dateTimestamp: new Date(obj.date).getTime(),
    finished: false,
  };

  state.unfinishedTasks.unshift(task);

  state.totalTasks.unshift(task);

  const category = state.categories.find(
    (cat) => cat.categoryName === obj.type
  );
  category.totalTasks = state.totalTasks.filter(
    (task) => task.type === category.categoryName
  ).length;

  category.finishedTasks = state.finishedTasks.filter(
    (task) => task.type === category.categoryName
  ).length;

  persistLocalStorage("unfinishedTasks", JSON.stringify(state.unfinishedTasks));
  persistLocalStorage("totalTasks", JSON.stringify(state.totalTasks));
  persistLocalStorage("categories", JSON.stringify(state.categories));
};

export const getTasksPerPage = function (page = state.pagination.page) {
  state.pagination.page = page;

  const start = (page - 1) * state.pagination.perPage;
  const end = page * state.pagination.perPage;

  return state.unfinishedTasks.slice(start, end);
};

export const finishTask = function (id) {
  const task = state.unfinishedTasks.find((task) => task.id === id);
  const taskIndex = state.unfinishedTasks.findIndex((task) => task.id === id);

  state.unfinishedTasks.splice(taskIndex, 1);

  task.finished = true;
  task.finishedDate = helpers.formatDate(Date.now());

  state.finishedTasks.push(task);

  const category = state.categories.find(
    (cat) => cat.categoryName === task.type
  );
  category.finishedTasks = state.finishedTasks.filter(
    (task) => task.type === category.categoryName
  ).length;

  persistLocalStorage("unfinishedTasks", JSON.stringify(state.unfinishedTasks));
  persistLocalStorage("finishedTasks", JSON.stringify(state.finishedTasks));
  persistLocalStorage("categories", JSON.stringify(state.categories));
};

export const deleteTask = function (id, location = "allTasks") {
  if (location === "allTasks") {
    const taskIndex = state.unfinishedTasks.findIndex((task) => task.id === id);

    state.unfinishedTasks.splice(taskIndex, 1);

    persistLocalStorage(
      "unfinishedTasks",
      JSON.stringify(state.unfinishedTasks)
    );
  }

  if (location === "finishedTasks") {
    const taskIndexFinished = state.finishedTasks.findIndex(
      (task) => task.id === id
    );

    state.finishedTasks.splice(taskIndexFinished, 1);

    persistLocalStorage("finishedTasks", JSON.stringify(state.finishedTasks));
  }

  console.log(state.totalTasks);

  const task = state.totalTasks.find((task) => task.id === id);
  const taskIndexTotal = state.totalTasks.findIndex((task) => task.id === id);

  console.log(task);

  const category = state.categories.find(
    (cat) => cat.categoryName === task.type
  );

  if (category.finishedTasks > 0) category.finishedTasks--;

  if (category.totalTasks > 0) category.totalTasks--;

  state.totalTasks.splice(taskIndexTotal, 1);
  persistLocalStorage("totalTasks", JSON.stringify(state.totalTasks));
  persistLocalStorage("categories", JSON.stringify(state.categories));
};

export const getCategories = function () {
  const categoriesWithTasks = state.categories.filter(
    (cat) => cat.totalTasks > 0
  );

  return categoriesWithTasks;
};

export const filterAndSort = function (category, sortType) {
  try {
    const filteredArray =
      category === "all"
        ? state.unfinishedTasks
        : state.unfinishedTasks.filter((task) => task.type === category);

    state.pagination.page = 1;

    if (filteredArray.length === 0) throw new Error("");

    if (sortType === "no-sort") {
      return filteredArray;
    }

    if (sortType === "ascending") {
      return [...filteredArray].sort(
        (a, b) => a.dateTimestamp - b.dateTimestamp
      );
    }

    if (sortType === "descending") {
      return [...filteredArray].sort(
        (a, b) => b.dateTimestamp - a.dateTimestamp
      );
    }
  } catch (err) {
    throw err;
  }
};

(function () {
  const storageUnfinished = localStorage.getItem("unfinishedTasks");
  const storageTotal = localStorage.getItem("totalTasks");
  const storageFinished = localStorage.getItem("finishedTasks");
  const storageCategories = localStorage.getItem("categories");

  if (storageUnfinished) state.unfinishedTasks = JSON.parse(storageUnfinished);
  if (storageTotal) state.totalTasks = JSON.parse(storageTotal);
  if (storageFinished) state.finishedTasks = JSON.parse(storageFinished);
  if (storageCategories) state.categories = JSON.parse(storageCategories);
})();
