import moment from "moment";
import {AbstractComponent} from "./abstract-component";

export class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getDuration() {
    const duration = moment.duration(moment(this._event.endTime).diff(moment(this._event.startTime)));
    const formatDuration = moment.utc(duration.as(`milliseconds`)).format(`H[H] m[M]`);
    return formatDuration;
  }

  getOptions() {
    const optionsSet = new Set(this._event.options.map((elem) => {
      if (elem.checked) {
        return `<ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">${elem.title}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${elem.price}</span>
                </li>
              </ul>`;
      } else {
        return null;
      }
    }));
    if (optionsSet.has(null)) {
      optionsSet.delete(null);
    }
    return Array.from(optionsSet).length > 2 ? Array.from(optionsSet).slice(0, 2).join(``) : Array.from(optionsSet).join(``);
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._event.getRandomType()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._event.getTypeDescription()}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${moment(this._event.getStartTime()).format(`HH:mm A`)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${moment(this._event.getEndTime()).format(`HH:mm A`)}</time>
        </p>
        <p class="event__duration">${this.getDuration()}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._event.price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      ${this.getOptions()}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }
}
