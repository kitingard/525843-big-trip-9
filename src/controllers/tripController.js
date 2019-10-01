import {EventController} from "./eventController";
import {Day} from "../components/day";
import {DaysList} from "../components/daysList";
import {EventMock} from "../components/data";

import {render, Position} from "../components/utils";
import {Sort} from "../components/sort";
import {Filter} from "../components/filter";
import moment from "moment";

export class TripController {
  constructor(container, data, header, statistics) {
    this._container = container;
    this._sortTrigger = `event`;
    this._filterTrigger = `everything`;
    this._filtersContainer = document.querySelector(`.trip-main__trip-controls`);
    this._dataController = data;
    this._data = this._dataController.getSortedData(this._sortTrigger, this._filterTrigger);
    this._daysList = new DaysList();
    this._sort = new Sort(this._sortTrigger);
    this._filter = new Filter(this._filterTrigger);
    this._creatingEvent = null;
    this._header = header;
    this._statistics = statistics;

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderDay(data) {
    if (data.events.length === 0) {
      return;
    }
    const day = new Day(data);
    const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    day.getEvents().map((elem) => this._renderEvent(elem, eventsContainer, data));
    this._reloadData();
  }

  _renderEvent(eventData, container, data) {
    const eventController = new EventController(eventData, container, data, this._onDataChange, this._onChangeView, this._daysList, `default`);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }

  _onDataChange(dayData, evData, newEvData) {
    this._daysList.removeElement();
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);

    if (dayData === null && evData === null && newEvData === null) {
      this._creatingEvent = null;
    } else if (dayData === null && evData === null) {
      this._creatingEvent = null;
      this._data[0].events = [newEvData, ...this._data[0].events];
    } else {
      const dayIndex = this._sortTrigger === `event` ? dayData.counter - 1 : dayData.count;
      const index = dayData.events.findIndex((it) => it === evData);
      if (newEvData === null) {
        this._data[dayIndex].events = [...this._data[dayIndex].events.slice(0, index), ...this._data[dayIndex].events.slice(index + 1)];
      } else {
        this._data[dayIndex].events[index] = newEvData;
      }
    }

    this._dataController.setData(this._data);
    this._dataController.getSortedData(this._sortTrigger, this._filterTrigger).map((day) => this._renderDay(day));

    this._header.reloadData(this._dataController);
    this._statistics.reloadData(this._dataController);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onSortLinkClick(evt, component, container, position, trigger) {
    evt.preventDefault();
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    if (trigger === `sortTrigger`) {
      this._sortTrigger = (evt.target.innerText).toLowerCase().trim();
    } else {
      this._filterTrigger = (evt.target.innerText).toLowerCase().trim();
    }

    component.removeElement();

    if (trigger === `sortTrigger`) {
      component.setData(this._sortTrigger);
    } else {
      component.setData(this._filterTrigger);
    }

    render(container, component.getElement(), position);
    component.getElement().addEventListener(`click`, (e) => this._onSortLinkClick(e, component, container, position, trigger));

    this._daysList.getElement().innerHTML = ``;
    this._dataController.getSortedData(this._sortTrigger, this._filterTrigger).map((day) => this._renderDay(day));
    this._reloadData();

    this._header.reloadData(this._dataController);
    this._statistics.reloadData(this._dataController);
  }

  _reloadData() {
    this._data = this._dataController.getSortedData(this._sortTrigger, this._filterTrigger);
    return this._data;
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const defaultEvent = new EventMock();
    defaultEvent.setData({
      description: ``,
      type: `bus`,
      city: ``,
      price: 0,
      startTime: moment(),
      endTime: moment(),
      isFavorite: false,
      options: [
        {
          value: `luggage`,
          title: `Add luggage`,
          price: 30,
          checked: false,
        },
        {
          value: `class`,
          title: `Switch to comfort class`,
          price: 100,
          checked: false,
        },
        {
          value: `meal`,
          title: `Add meal`,
          price: 15,
          checked: false,
        },
        {
          value: `seats`,
          title: `Choose seats`,
          price: 5,
          checked: false,
        },
        {
          value: `train`,
          title: `Travel by train`,
          price: 40,
          checked: false,
        },
      ],
    });

    const defaultDay = {
      date: ``,
      counter: ``,
      events: [defaultEvent],
    };
    this._creatingEvent = new EventController(defaultEvent.getData(), this._container.querySelector(`.trip-days`), defaultDay, this._onDataChange, this._onChangeView, this._daysList, `adding`);
  }

  init() {
    render(this._filtersContainer, this._filter.getElement(), Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._data.map((day) => this._renderDay(day));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt, this._sort, this._container, Position.AFTERBEGIN, `sortTrigger`));
    this._filter.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt, this._filter, this._filtersContainer, Position.BEFOREEND, `filterTrigger`));
  }
}
