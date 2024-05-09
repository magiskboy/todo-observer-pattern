import { v4 as uuidV4 } from "uuid";
import { Observable, Observer } from "./observer";

export class TaskModel extends Observable {
  private tasks: Task[];

  constructor() {
    super();
    this.tasks = [];
  }

  addTask(task: Omit<Task, "id">) {
    this.tasks.push({
      id: uuidV4(),
      ...task,
    });
    this.notifyObservers();
  }

  getTasks() {
    return this.tasks;
  }

  updateTask(task: Task) {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
    this.notifyObservers();
  }
}

export class TaskView extends Observer {
  private model: TaskModel;
  private container: HTMLUListElement;

  constructor(model: TaskModel, list: HTMLUListElement) {
    super();
    this.model = model;
    this.container = list;
    this.model.registerObserver(this);
  }

  update() {
    this.container.innerHTML = "";
    this.model.getTasks().forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.name;
      li.onclick = () => {
        this.model.updateTask({
          ...task,
          completed: !task.completed,
        });
      };
      task.completed && (li.style.textDecoration = "line-through");
      this.container.appendChild(li);
    });
  }
}

type Task = {
    id: string;
    name: string;
    completed: boolean;
  }