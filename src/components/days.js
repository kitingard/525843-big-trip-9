import {createElement} from "./utils";

export class Day {
  constructor({date, counter, events}) {
    this._date = date;
    this._counter = counter;
    this._events = events;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._counter}</span>
      <time class="day__date" datetime="${this._date}">${this._date}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
  }
}
