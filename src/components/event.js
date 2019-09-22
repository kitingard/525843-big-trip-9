import moment from "moment";
import {AbstractComponent} from "./abstract-component";
import {onOptionsView} from "./onOptionsView";

export class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getOptions() {
    const optionsSet = new Set(this._event.options.map((elem) => {
      if (elem.checked) {
        return onOptionsView(elem);
      } else {
        return null;
      }
    }));
    if (optionsSet.has(null)) {
      optionsSet.delete(null);
    }
    return Array.from(optionsSet).length > 3 ? Array.from(optionsSet).slice(0, 3).join(``) : Array.from(optionsSet).join(``);
  }

  _getTimeDuration() {
    if (this._event.timeDuration < 60 * 60 * 1000) {
      return moment.utc(this._event.timeDuration).format(`m[M]`);
    } else if (this._event.timeDuration > 24 * 60 * 60 * 1000) {
      return moment.utc(this._event.timeDuration).format(`D[D] H[H] m[M]`);
    } else {
      return moment.utc(this._event.timeDuration).format(`H[H] m[M]`);
    }
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._event.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._event.typeDescription + ` ` + this._event.city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${moment(this._event.startTime).format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${moment(this._event.endTime).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${this._getTimeDuration()}</p>
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
