import moment from "moment";
import {sortDates} from "./utils";

export class DataController {
  constructor(event) {
    this._event = event;
    this._eventSortedData = [];
    this._timeSortedData = [];
    this._priceSortedData = [];
    this._eventsData = new Array(9).fill(``).map(this._event);
  }

  _sortEvents() {
    let array = [];
    this._eventsData.map((element) => {
      element.getRandomCity();
      element.getRandomType();
      element.getTypeDescription();
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
      this._eventSortedData.push({date: time, counter: index + 1, events});
    });
    return this._eventSortedData;
  }

  _sortTimes() {
    let durArr = this._eventsData.map((ele) => {
      return ele.timeDuration;
    }).sort(sortDates).reverse();
    new Set(durArr).forEach((dur) => {
      const durEv = this._eventsData.filter((el) => {
        return el.timeDuration === dur;
      });
      this._timeSortedData.push({date: ``, counter: ``, events: durEv});
    });
    return this._timeSortedData;
  }

  _sortPrices() {
    let priceArr = this._eventsData.map((ele) => {
      return ele.price;
    }).sort((a, b) => a - b).reverse();
    new Set(priceArr).forEach((price) => {
      const priceEv = this._eventsData.filter((el) => {
        return el.price === price;
      });
      this._priceSortedData.push({date: ``, counter: ``, events: priceEv});
    });
    return this._priceSortedData;
  }

  getTotalData() {
    let priceArray = [];
    this._eventSortedData.map((day) => {
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
    const first = this._eventSortedData[0].date;
    const last = this._eventSortedData[this._eventSortedData.length - 1].date;
    return first.slice(0, 3) === last.slice(0, 3) ? first + ` - ` + last.slice(3) : first + ` - ` + last;
  }

  getRoute() {
    const citiesArray = [];
    this._eventSortedData.map((day) => {
      day.events.map((eve) => {
        citiesArray.push(eve.city);
      });
    });
    return citiesArray.length <= 3 ? citiesArray.join(` &mdash; `) : citiesArray[0] + ` &mdash; ... &mdash; ` + citiesArray[citiesArray.length - 1];
  }

  getSortedData() {
    const sortedData = new Map([
      [`event`, this._eventSortedData],
      [`time`, this._timeSortedData],
      [`price`, this._priceSortedData]
    ]);
    return sortedData;
  }

  init() {
    this._sortEvents();
    this._sortTimes();
    this._sortPrices();
  }
}
