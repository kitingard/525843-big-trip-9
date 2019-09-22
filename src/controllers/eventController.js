import {Event} from "../components/event";
import {EventEdit} from "../components/eventEdit";
import {EventMock} from "../components/data";
import {render, Position} from "../components/utils";
import moment from "moment";

export class EventController {
  constructor(eventData, container, dayData, onDataChange, onChangeView, dayList) {
    this._container = container;
    this._eventData = eventData;
    this._dayData = dayData;
    this._dayList = dayList;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEdit(this._eventData);

    this.create(this._eventData, this._container, this._dayData);
  }

  setDefaultView() {
    if (this._dayList.getElement().contains(this._eventEdit.getElement())) {
      this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }

  create(evData, container, dayData) {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    Array.from(this._eventView.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn) => btn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
      container.replaceChild(this._eventEdit.getElement(), this._eventView.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    }));

    this._eventEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._eventEdit.getElement());
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

      this._onDataChange(this._dayData, this._eventData, updatedEvent.getData());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventEdit.getDefaulEventState();
      container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, this._eventView.getElement(), Position.BEFOREEND);
  }
}
