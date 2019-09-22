import {EventController} from "./eventController";
import {Day} from "../components/day";
import {DaysList} from "../components/daysList";
import {render, Position} from "../components/utils";
import {Sort} from "../components/sort";

export class TripController {
  constructor(container, data) {
    this._container = container;
    this._sortTrigger = `event`;
    this._dataController = data;
    this._data = this._dataController.getSortedData(this._sortTrigger);
    this._daysList = new DaysList();
    this._sort = new Sort(this._sortTrigger);

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderDay(data) {
    const day = new Day(data);
    const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    day.getEvents().map((elem) => this._renderEvent(elem, eventsContainer, data));
    this._reloadData();
  }

  _renderEvent(eventData, container, data) {
    const eventController = new EventController(eventData, container, data, this._onDataChange, this._onChangeView, this._daysList);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }

  _onDataChange(dayData, evData, newEvData) {
    this._daysList.removeElement();
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);

    if (this._sortTrigger === `event`) {
      this._data[dayData.counter - 1].events[dayData.events.findIndex((it) => it === evData)] = newEvData;
    } else {
      this._data[dayData.count].events[dayData.events.findIndex((it) => it === evData)] = newEvData;
    }

    this._dataController.setData(this._data);
    this._dataController.getSortedData(this._sortTrigger).map((day) => this._renderDay(day));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._sortTrigger = (evt.target.innerText).toLowerCase().trim();

    this._sort.removeElement();
    this._sort.setData(this._sortTrigger);
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    this._sort.getElement().addEventListener(`click`, (e) => this._onSortLinkClick(e));

    this._daysList.getElement().innerHTML = ``;
    this._dataController.getSortedData(this._sortTrigger).map((day) => this._renderDay(day));
    this._reloadData();
  }

  _reloadData() {
    this._data = this._dataController.getSortedData(this._sortTrigger);
    return this._data;
  }

  init() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
    this._data.map((day) => this._renderDay(day));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
}
