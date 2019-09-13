import moment from "moment";
import {sortDates, sortNumbers} from "./utils";

export class DataController {
  constructor(event) {
    this._event = event;
    this._eventSortedData = [];
    this._timeSortedData = [];
    this._priceSortedData = [];
    this._eventsData = new Array(9).fill(``).map((elem) => elem = this._event.init());
  }

  _sortEvents() {
    console.log(this._event)
    console.log(this._event.init())
    console.log(this._eventsData)
    let array = [];
    this._eventsData.map((element) => {
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

  _sortTimesAndPrices(param, func, array) {
    let numArray = this._eventsData.map((it) => {
      return param === `price` ? it.price : it.timeDuration;
    }).sort(func).reverse();
    new Set(numArray).forEach((parameter) => {
      const sortEv = this._eventsData.filter((el) => {
        return param === `price` ? el.price === parameter : el.timeDuration === parameter;
      });
      array.push({date: ``, counter: ``, events: sortEv});
    });
    return array;
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
    this._sortTimesAndPrices(`timeDuration`, sortDates, this._timeSortedData);
    this._sortTimesAndPrices(`price`, sortNumbers, this._priceSortedData);
  }
}
