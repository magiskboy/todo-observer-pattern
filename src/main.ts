import { TaskModel, TaskView } from "./task";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form") as HTMLFormElement;
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const list = document.getElementById("todo-list") as HTMLUListElement;

  const model = new TaskModel();
  const view = new TaskView(model, list);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    model.addTask({
      name: input.value,
      completed: false,
    });
    input.value = "";
    return false;
  });
});
