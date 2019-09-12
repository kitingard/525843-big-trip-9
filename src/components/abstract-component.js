import {createElement, unrender} from "./utils";

export class AbstractComponent {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }
}
