import moment from "moment";
import {sortDates, sortNumbers} from "./utils";

export class DataController {
  constructor(event) {
    this._event = event;
    this._eventsData = new Array(9).fill(``).map((elem) => elem = this._event.init());
    this._eventSortedData = this._sortEvents();
  }

  _sortEvents() {
    const eventSortedData = [];
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
      eventSortedData.push({date: time, counter: index + 1, events});
    });
    return eventSortedData;
  }

  _sortTimesAndPrices(param, func) {
    const array = [];
    const numArray = this._eventsData.map((it) => {
      return param === `price` ? it.price : it.timeDuration;
    }).sort(func).reverse();
    const numSet = new Set(numArray);
    Array.from(numSet).forEach((parameter, i) => {
      const sortEv = this._eventsData.filter((el) => {
        return param === `price` ? el.price === parameter : el.timeDuration === parameter;
      });
      return array.push({date: ``, counter: ``, count: i, events: sortEv});
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

  setData(data) {
    console.log(`old data`, this._eventsData)
    this._eventsData = [];
    const newData = data.map((el) => el.events);
    newData.map((it) => it.map((elem) => this._eventsData.push(elem)))
    console.log(`new data `, this._eventsData)
    return this._eventsData;
  }

  getSortedData(param) {
    const sortedData = new Map([
      [`event`, this._sortEvents()],
      [`time`, this._sortTimesAndPrices(`timeDuration`, sortDates)],
      [`price`, this._sortTimesAndPrices(`price`, sortNumbers)]
    ]);
    console.log(`sort events`, this._sortEvents());
    console.log(`time events`, this._sortTimesAndPrices(`timeDuration`, sortDates));
    console.log(`price events`, this._sortTimesAndPrices(`price`, sortNumbers));
    return sortedData.get(param);
  }

  init() {
    this._sortEvents();
    this._sortTimesAndPrices(`timeDuration`, sortDates, this._timeSortedData);
    this._sortTimesAndPrices(`price`, sortNumbers, this._priceSortedData);
  }
}
