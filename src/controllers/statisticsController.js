import {Statistics} from "../components/statistics";
import {render, Position, reducer} from "../components/utils";


export class StatisticsController {
  constructor(data) {
    this._data = data.eventsData;
    this._statistics = new Statistics();

    this.hide();
  }

  reloadData(newData) {
    this._data = newData.eventsData;
    this.getChartsData(`money`);
    this.getChartsData(`transport`);
    this.getChartsData(`timeSpent`);
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
                  prices.push(parseInt(offer.price, 10));
                } else {
                  return;
                }
              });
              prices.push(parseInt(elem.price, 10));
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
        this._statistics.renderMoneyChart(typesArray, numbersArray);
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
        this._statistics.renderTransportChart(typesArray, numbersArray);
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
          numbersArray.push(Math.round(timeArray.reduce(reducer) / (60 * 60 * 1000)));
        });
        this._statistics.renderTimeChart(typesArray, numbersArray);
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
    this.getChartsData(`money`);
    this.getChartsData(`transport`);
    this.getChartsData(`timeSpent`);
  }
}
