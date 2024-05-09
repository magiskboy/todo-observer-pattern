export class Observer {
  update() {
    throw new Error("Method not implemented.");
  }
}

export class Observable {
  private observers: Observer[];

  constructor() {
    this.observers = [];
  }

  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer: Observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers() {
    this.observers.forEach((o) => o.update());
  }
}
