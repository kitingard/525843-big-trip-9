import {Event} from "../components/event";
import {EventEdit} from "../components/eventEdit";
import {EventMock} from "../components/data";
import {render, Position} from "../components/utils";
import moment from "moment";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class EventController {
  constructor(eventData, container, dayData, onDataChange, onChangeView, dayList, mode) {
    this._container = container;
    this._eventData = eventData;
    this._dayData = dayData;
    this._dayList = dayList;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._mode = mode;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEdit(this._eventData);

    this.create(this._eventData, this._container, this._dayData, this._mode);
  }

  setDefaultView() {
    if (this._dayList.getElement().contains(this._eventEdit.getElement())) {
      this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }

  create(evData, container, dayData, mode) {
    let renderPosition = Position.BEFOREEND;
    let currentView = this._eventView;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._eventEdit;
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {

        if (mode === Mode.DEFAULT) {
          if (this._dayList.getElement().contains(this._eventEdit.getElement())) {
            this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
          }
        } else if (mode === Mode.ADDING) {
          this._container.removeChild(currentView.getElement());
        }

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
        description: `temporary description`,
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

      this._onDataChange(dayData, evData, updatedEvent.getData());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._eventEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onDataChange(dayData, evData, null);
    })

    this._eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventEdit.getDefaulEventState();
      container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, currentView.getElement(), renderPosition);
  }
}
