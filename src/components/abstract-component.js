import {createElement, unrender} from "./utils";

export class AbstractComponent {
  constructor() {
    this._element = null;
  }

  getElement() {
    return this._element ? this._element : this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }
}
