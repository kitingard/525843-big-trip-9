import {render, Position} from "./utils";
import {Day} from "./day";
import {Sort} from "./sort";
import {Event} from "./event";
import {EventEdit} from "./eventEdit";
import {DaysList} from "./daysList";

export class TripController {
  constructor(container, data) {
    this._container = container;
    this._sortData = `event`;
    this._data = data;
    this._daysList = new DaysList();
    this._sort = new Sort(this._sortData);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._data.get(this._sortData).map((day) => this._renderDay(day));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderDay(data) {
    const day = new Day(data);
    const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    day.getEvents().map((elem) => this._renderEvent(elem, eventsContainer));
  }

  _renderEvent(evData, container) {
    const eventComponent = new Event(evData);
    const eventEditComponent = new EventEdit(evData);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    Array.from(eventComponent.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn) => btn.addEventListener(`click`, () => {
      container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    }));

    eventEditComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, eventComponent.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._sortData = (evt.target.innerText).toLowerCase().trim();

    this._sort.removeElement();
    this._sort.setData(this._sortData);
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    this._sort.getElement().addEventListener(`click`, (e) => this._onSortLinkClick(e));

    this._daysList.getElement().innerHTML = ``;
    this._data.get(this._sortData).map((day) => this._renderDay(day));
  }
}
