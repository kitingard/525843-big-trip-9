import moment from "moment";
import {render, Position} from "./utils";
import {sortDates} from "./utils";
import {Day} from "./days";
import {Sort} from "./sort";
import {Event} from "./event";
import {EventEdit} from "./eventEdit";

export class TripController {
  constructor(container, event) {
    this._event = event;
    this._daysData = [];
    this._container = container;
    this._eventsData = new Array(9).fill(``).map(this._event);
    this._sort = new Sort();
  }

  sortEvents() {
    let array = [];
    this._eventsData.map((element) => {
      element.getRandomCity();
      element.getRandomType();
      element.getStartTime();
      element.getEndTime();
      element.getDuration();
      array.push(moment(element.startTime).format(`MMM D`));
    });
    const startTimeSet = new Set(array.sort(sortDates));
    Array.from(startTimeSet).forEach((time, index) => {
      let events = [];
      events = this._eventsData.filter((elem) => {
        return moment(elem.startTime).format(`MMM D`) === time;
      });
      this._daysData.push({date: time, counter: index + 1, events});
    });
  }

  sortTimes() {
    let timesArr = [];
    let daysSet = new Set(this._eventsData.map((ele) => {
      return moment(ele.startTime).format(`MMM D`);
    }).sort(sortDates));
    let durArr = this._eventsData.map((ele) => {
      return ele.timeDuration;
    }).sort(sortDates).reverse();
    durArr.forEach((dur) => {
      const a = this._eventsData.filter((el) => {
        return el.timeDuration === dur;
      });
      timesArr.push({date: moment(a[0].startTime).format(`MMM D`), counter: Array.from(daysSet).indexOf(moment(a[0].startTime).format(`MMM D`)) + 1, events: a});
    });
  }

  totalData() {
    let priceArray = [];
    this._daysData.map((day) => {
      day.events.map((ev) => {
        priceArray.push(ev.price);
        ev.options.map((option) => {
          if (option.checked) {
            priceArray.push(option.price);
          }
        });
      });
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return priceArray.reduce(reducer);
  }

  getDates() {
    const first = this._daysData[0].date;
    const last = this._daysData[this._daysData.length - 1].date;
    return first.slice(0, 3) === last.slice(0, 3) ? first + ` - ` + last.slice(3) : first + ` - ` + last;
  }

  getRoute() {
    const citiesArray = [];
    this._daysData.map((day) => {
      day.events.map((eve) => {
        citiesArray.push(eve.city);
      });
    });
    return citiesArray.length <= 3 ? citiesArray.join(` &mdash; `) : citiesArray[0] + ` &mdash; ... &mdash; ` + citiesArray[citiesArray.length - 1];
  }

  init() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    this._daysData.map((day) => this._renderDay(day));
  }

  _renderDay(data) {
    const day = new Day(data);
    const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

    render(this._container, day.getElement(), Position.BEFOREEND);
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

    eventEditComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
      container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, eventComponent.getElement(), Position.BEFOREEND);
  }
}
