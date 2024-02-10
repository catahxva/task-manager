import * as model from "./model.js";
import createView from "./views/createView.js";
import progressView from "./views/progressView.js";
import tasksView from "./views/tasksView.js";
import paginationView from "./views/paginationView.js";
import filtersView from "./views/filtersView.js";

const renderPaginationTasksProgress = function () {
  tasksView.render(model.getTasksPerPage());

  paginationView.render({
    numberTasks: model.state.unfinishedTasks.length,
    ...model.state.pagination,
  });

  progressView.render(model.getCategories());
};

const controlLoadTasksAndProgress = function () {
  renderPaginationTasksProgress();
};

const controlTasks = function () {
  renderPaginationTasksProgress();
};

const controlFinishedTasks = function () {
  tasksView.render(model.state.finishedTasks);
};

const controlCreateTask = function () {
  model.addTask(createView.getTaskData());

  createView.showNotification();

  renderPaginationTasksProgress();

  filtersView.changeFilterButton();
};

const controlFinishTask = function (id) {
  model.finishTask(id);

  renderPaginationTasksProgress();
};

const controlDeleteTaskUnfinished = function (id) {
  model.deleteTask(id);

  renderPaginationTasksProgress();
};

const controlDeleteTaskFinished = function (id) {
  model.deleteTask(id, "finishedTasks");

  tasksView.render(model.state.finishedTasks);

  progressView.render(model.getCategories());
};

const controlPagination = function (goToPage) {
  tasksView.render(model.getTasksPerPage(goToPage));

  paginationView.render({
    numberTasks: model.state.unfinishedTasks.length,
    ...model.state.pagination,
  });
};

const controlFilterSort = function (category, sort) {
  try {
    const filteredTasks = model.filterAndSort(category, sort);

    tasksView.render(filteredTasks);
  } catch (err) {
    tasksView.renderError();
  }
};

const init = function () {
  createView.addHandlerSubmit(controlCreateTask);

  filtersView.addHandlerAllTasks(controlTasks);
  filtersView.addHandlerFinishedTasks(controlFinishedTasks);
  filtersView.addHandlerFilters(controlFilterSort);

  tasksView.addHandlerLoad(controlLoadTasksAndProgress);
  tasksView.addHandlerFinish(controlFinishTask);
  tasksView.addHandlerDelete(controlDeleteTaskUnfinished);
  tasksView.addHandlerDeleteFinished(controlDeleteTaskFinished);

  paginationView.addHandlerPagination(controlPagination);
};

init();
