import flatpicr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from "moment";
import {AbstractComponent} from "./abstract-component";
import {getTypeDescription} from "./utils";
import {iconTypeView} from "./iconTypeView";
import {optionsView} from "./optionsView";
import {typeOptionsView} from "./typeOptionsView";

export class EventEdit extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;

    this._subscribeOnEvents();
  }

  _getEventTypeOptions(event) {
    return typeOptionsView(event);
  }

  _getIcon(type) {
    return iconTypeView(type);
  }

  _getOption() {
    return optionsView();
  }

  _setTypeOptionListener() {
    Array.from(this.getElement().querySelectorAll(`.event__type-item`)).map((type) => type.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        return;
      } else {
        this.getElement().querySelector(`.event__type-btn`).innerHTML = this._getIcon(evt.target.value);
        this.getElement().querySelector(`.event__type-output`).innerText = getTypeDescription(evt.target.value);
      }
    }));
  }

  _getStartTime() {
    return flatpicr(this.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: moment(this._event.startTime).toDate(),
      dateFormat: "d/m/y H:i",
      altFormat: "d/m/y H:i",
      altInput: true,
      enableTime: true,
      time_24hr: true,
    });
  }

  _getEndTime() {
    return flatpicr(this.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      minDate: moment(this._event.startTime).toDate(),
      defaultDate: moment(this._event.endTime).toDate(),
      dateFormat: "d/m/y H:i",
      altFormat: "d/m/y H:i",
      altInput: true,
      enableTime: true,
      time_24hr: true,
    });
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.event__type-btn`).addEventListener(`click`, () => {
      this._setTypeOptionListener();
    });

    this._getStartTime();
    this._getEndTime();
  }

  getDefaulEventState() {
    this.getElement().querySelector(`.event__available-offers`).innerHTML = this._getOption();
    this.getElement().querySelector(`.event__type-btn`).innerHTML = this._getIcon(this._event.type);
    this.getElement().querySelector(`.event__type-output`).innerText = getTypeDescription(this._event.type);
    this.getElement().querySelector(`.event__type-list`).innerHTML = this._getEventTypeOptions(this._event);
    this._setTypeOptionListener();
    this._getStartTime();
    this._getEndTime();
  }

  getTemplate() {
    return `<form class="trip-events__item event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          ${this._getIcon(this._event.type)}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          ${this._getEventTypeOptions(this._event)}
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${this._event.typeDescription}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._event.city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${this._event.cities.map((city) => `<option value="${city}">${city}</option>`).join(``)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(this._event.startTime).format(`D/M/YY HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(this._event.endTime).format(`D/M/YY HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._event.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._event.isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${this._getOption()}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${this._event.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="${`http://picsum.photos/300/150?r=${Math.random()}`}" alt="Event photo">
            <img class="event__photo" src="${`http://picsum.photos/300/150?r=${Math.random()}`}" alt="Event photo">
            <img class="event__photo" src="${`http://picsum.photos/300/150?r=${Math.random()}`}" alt="Event photo">
            <img class="event__photo" src="${`http://picsum.photos/300/150?r=${Math.random()}`}" alt="Event photo">
            <img class="event__photo" src="${`http://picsum.photos/300/150?r=${Math.random()}`}" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
    </form>`;
  }
}
