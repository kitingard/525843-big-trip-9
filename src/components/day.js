import {AbstractComponent} from "./abstract-component";

export class Day extends AbstractComponent {
  constructor({date, counter, events}) {
    super();
    this._date = date;
    this._counter = counter;
    this._events = events;
  }

  getEvents() {
    return this._events;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._counter}</span>
      <time class="day__date" datetime="${this._date.slice(0, -3)}">${this._date.slice(0, -3)}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
  }
}
