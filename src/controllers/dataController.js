import moment from "moment";
import {sortDates, sortNumbers} from "../components/utils";

export class DataController {
  constructor(event) {
    this._event = event;
    this._eventsData = this._getEventsData();
  }

  _getEventsData() {
    const defaultEventsData = new Array(9).fill(``).map((el) => {
      el = this._event.init();
      return el;
    });
    return defaultEventsData;
  }

  _sortEvents(filter) {
    const eventSortedData = [];
    const array = this._eventsData.map((element) => {
      return moment(element.startTime).format(`MMM D YY`);
    });
    const startTimeSet = new Set(array.sort(sortDates));
    Array.from(startTimeSet).forEach((time, index) => {
      let events = this._eventsData.filter((elem) => {
        return moment(elem.startTime).format(`MMM D YY`) === time;
      }).sort(sortDates).reverse();
      if (filter !== `everything`) {
        let filterArray = [];
        events.map((it) => {
          const today = moment().toDate();
          if (filter === `future` && moment(it.startTime).toDate() >= today) {
            return filterArray.push(it);
          } else if (filter === `past` && moment(it.startTime).toDate() < today) {
            return filterArray.push(it);
          } else {
            return ``;
          }
        });
        events = filterArray;
      }
      eventSortedData.push({date: time, counter: index + 1, events});
    });
    return eventSortedData;
  }

  _sortTimesAndPrices(param, func, filter) {
    const numArray = this._eventsData.map((it) => {
      return param === `price` ? it.price : it.timeDuration;
    }).sort(func).reverse();
    const numSet = new Set(numArray);
    const array = Array.from(numSet).map((parameter, i) => {
      let sortEv = this._eventsData.filter((el) => {
        return param === `price` ? el.price === parameter : el.timeDuration === parameter;
      });
      if (filter !== `everything`) {
        let filterArray = [];
        sortEv.map((it) => {
          const today = moment().toDate();
          if (filter === `future` && moment(it.startTime).toDate() >= today) {
            return filterArray.push(it);
          } else if (filter === `past` && moment(it.startTime).toDate() < today) {
            return filterArray.push(it);
          } else {
            return ``;
          }
        });
        sortEv = filterArray;
      }
      return {date: ``, counter: ``, count: i, events: sortEv};
    });
    return array;
  }

  getTotalData() {
    let priceArray = [];
    this._sortEvents(`everything`).forEach((day) => {
      day.events.forEach((ev) => {
        priceArray.push(parseInt(ev.price, 10));
        ev.options.forEach((option) => {
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
    const first = this._sortEvents(`everything`)[0].date.slice(0, -3);
    const last = this._sortEvents(`everything`)[this._sortEvents(`everything`).length - 1].date.slice(0, -3);
    return first.slice(0, 3) === last.slice(0, 3) ? first + ` - ` + last.slice(3) : first + ` - ` + last;
  }

  getRoute() {
    const citiesArray = [];
    this._sortEvents(`everything`).map((day) => {
      day.events.map((eve) => {
        citiesArray.push(eve.city);
      });
    });
    return citiesArray.length <= 3 ? citiesArray.join(` &mdash; `) : citiesArray[0] + ` &mdash; ... &mdash; ` + citiesArray[citiesArray.length - 1];
  }

  setData(data) {
    this._eventsData = [];
    data.map((el) => el.events).forEach((it) => it.forEach((elem) => this._eventsData.push(elem)));

    return this._eventsData;
  }

  getSortedData(param, filter) {
    const sortedData = new Map([
      [`event`, this._sortEvents(filter)],
      [`time`, this._sortTimesAndPrices(`timeDuration`, sortDates, filter)],
      [`price`, this._sortTimesAndPrices(`price`, sortNumbers, filter)],
    ]);
    return sortedData.get(param);
  }

  init() {
    this._sortEvents(`everything`);
    this._sortTimesAndPrices(`timeDuration`, sortDates, this._timeSortedData, `everything`);
    this._sortTimesAndPrices(`price`, sortNumbers, this._priceSortedData, `everything`);
  }
}
