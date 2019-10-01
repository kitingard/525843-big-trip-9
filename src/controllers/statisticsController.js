import {Statistics} from "../components/statistics";
import {render, Position, reducer} from "../components/utils";

const DECIMAL_NUMBER_SYSTEM = 10;
const HOUR = 60 * 60 * 1000;

export class StatisticsController {
  constructor(data) {
    this._data = data.eventsData;
    this._statistics = new Statistics();
    this._moneyData = [];
    this._transportData = [];
    this._timeSpentData = [];

    this.getChartsData(`money`);
    this.getChartsData(`transport`);
    this.getChartsData(`timeSpent`);
    this.hide();
  }

  reloadData(newData) {
    this._data = newData.eventsData;

    this.getChartsData(`money`);
    this.getChartsData(`transport`);
    this.getChartsData(`timeSpent`);

    this._statistics.renderMoneyChart(this._moneyData.labels, this._moneyData.data);
    this._statistics.renderTransportChart(this._transportData.labels, this._transportData.data);
    this._statistics.renderTimeChart(this._timeSpentData.labels, this._timeSpentData.data);
  }

  getChartsData(param) {
    const typeSet = new Set(this._data.map((el) => el.type));
    let typesArray = Array.from(typeSet);
    let numbersArray = [];

    switch (param) {
      case `money`:
        const typesAndPriceArray = [];
        this._data.forEach((elem) => {
          typesArray.forEach((it) => {
            if (it === elem.type) {
              const prices = [];
              elem.options.forEach((offer) => {
                if (offer.checked === true) {
                  prices.push(parseInt(offer.price, DECIMAL_NUMBER_SYSTEM));
                } else {
                  return;
                }
              });
              prices.push(parseInt(elem.price, DECIMAL_NUMBER_SYSTEM));
              return typesAndPriceArray.push({
                type: elem.type,
                price: prices.reduce(reducer)
              });
            } else {
              return ``;
            }
          });
        });
        typesArray.forEach((type) => {
          const priceArray = [];
          typesAndPriceArray.forEach((element) => {
            if (type === element.type) {
              priceArray.push(element.price);
            }
          });
          numbersArray.push(priceArray.reduce(reducer));
        });
        this._moneyData = {labels: typesArray, data: numbersArray};
        break;

      case `transport`:
        const transport = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
        typesArray = typesArray.filter((type) => {
          return transport.includes(type);
        });
        typesArray.forEach((elem) => {
          let i = 0;
          this._data.forEach((el) => {
            if (elem === el.type) {
              i++;
            }
          });
          numbersArray.push(i);
        });
        this._transportData = {labels: typesArray, data: numbersArray};
        break;

      case `timeSpent`:
        const durationArray = [];
        this._data.forEach((elem) => {
          typesArray.forEach((it) => {
            if (it === elem.type) {
              return durationArray.push({
                name: elem.type,
                value: elem.timeDuration
              });
            } else {
              return ``;
            }
          });
        });
        typesArray.forEach((type) => {
          const timeArray = [];
          durationArray.forEach((element) => {
            if (type === element.name) {
              timeArray.push(element.value);
            }
          });
          numbersArray.push(Math.round(timeArray.reduce(reducer) / HOUR));
        });
        this._timeSpentData = {labels: typesArray, data: numbersArray};
        break;

      default:
        break;
    }
  }

  show() {
    this._statistics.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  init() {
    const statisticsContainer = document.querySelector(`.page-body__page-main > .page-body__container`);
    render(statisticsContainer, this._statistics.getElement(), Position.BEFOREEND);

    this._statistics.renderMoneyChart(this._moneyData.labels, this._moneyData.data);
    this._statistics.renderTransportChart(this._transportData.labels, this._transportData.data);
    this._statistics.renderTimeChart(this._timeSpentData.labels, this._timeSpentData.data);
  }
}
