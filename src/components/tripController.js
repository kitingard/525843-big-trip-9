import moment from "moment";
import {render, Position} from "./utils";
import {Day} from "./day";
import {Sort} from "./sort";
import {Event} from "./event";
import {EventEdit} from "./eventEdit";
import {DaysList} from "./daysList";
import {EventMock} from "./data";

export class TripController {
  constructor(container, data) {
    this._container = container;
    this._sortData = `event`;
    this._dataController = data;
    this._data = this._dataController.getSortedData(this._sortData);
    this._daysList = new DaysList();
    this._sort = new Sort(this._sortData);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._data.map((day) => this._renderDay(day));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderDay(data) {
    const day = new Day(data);
    const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    day.getEvents().map((elem) => this._renderEvent(elem, eventsContainer, data));
    this._reloadData();
  }

  _renderEvent(evData, container, dayData) {
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
      const formData = new FormData(eventEditComponent.getElement());
      const updatedEvent = new EventMock();

      updatedEvent.setData({
        description: dayData.events[dayData.events.findIndex((it) => it === evData)].description,
        type: formData.get(`event-type`),
        city: formData.get(`event-destination`),
        price: formData.get(`event-price`),
        startTime: moment(formData.get(`event-start-time`), `D/M/YY HH:mm`),
        endTime: moment(formData.get(`event-end-time`), `D/M/YY HH:mm`),
        isFavorite: formData.get(`event-favorite`),
        options: [
          {
            value: `luggage`,
            title: `Add luggage`,
            price: 30,
            checked: formData.get(`event-offer-luggage`) === `on`,
          },
          {
            value: `class`,
            title: `Switch to comfort class`,
            price: 100,
            checked: formData.get(`event-offer-class`) === `on`,
          },
          {
            value: `meal`,
            title: `Add meal`,
            price: 15,
            checked: formData.get(`event-offer-meal`) === `on`,
          },
          {
            value: `seats`,
            title: `Choose seats`,
            price: 5,
            checked: formData.get(`event-offer-seats`) === `on`,
          },
          {
            value: `train`,
            title: `Travel by train`,
            price: 40,
            checked: formData.get(`event-offer-train`) === `on`,
          },
        ],
      });

      this._daysList.removeElement();

      render(this._container, this._daysList.getElement(), Position.BEFOREEND);

      // this._getUpdatedData(dayData, eventsList, evData, updatedEvent.getData());
      // console.log(`day data   mmmm    `, dayData)
      // this._sortData === `event` ? this._data[dayData.counter - 1].events[eventsList.findIndex((it) => it === evData)] = updatedEvent.getData() : this._data[dayData.count].events[eventsList.findIndex((it) => it === evData)] = updatedEvent.getData();

      this._sortData === `event` ?
        this._data[dayData.counter - 1].events[dayData.events.findIndex((it) => it === evData)] = updatedEvent.getData()
      :
        this._data[dayData.count].events[dayData.events.findIndex((it) => it === evData)] = updatedEvent.getData();

      this._dataController.setData(this._data);

      this._dataController.getSortedData(this._sortData).map((day) => this._renderDay(day));
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
    this._dataController.getSortedData(this._sortData).map((day) => this._renderDay(day));
    this._reloadData();
  }

  _reloadData() {
    console.log(`обновили`, this._data = this._dataController.getSortedData(this._sortData))
    return this._data = this._dataController.getSortedData(this._sortData);
  }

  _getUpdatedData(day, list, event, updatedEventData) {
    this._sortData === `event` ? this._data[day.counter].events[list.findIndex((it) => it === event)] = updatedEventData : this._data[day.count].events[list.findIndex((it) => it === event)] = updatedEventData;
    this._dataController.setData(this._data);
  }
}
