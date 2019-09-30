import {Statistics} from "../components/statistics";
import {render, Position, reducer} from "../components/utils";

export class StatisticsController {
  constructor(data) {
    this._data = data.eventsData;
    this._statistics = new Statistics();

    this.hide();
    this.getChartsData(`money`);
    this.getChartsData(`transport`);
  }

  getChartsData(param) {
    const typeSet = new Set(this._data.map((el) => el.type));
    let typesArray = [];
    let numbersArray = [];

    switch (param) {

      case `money`:
        typesArray = Array.from(typeSet);
        const typesAndPriceArray = [];
        
        this._data.forEach((elem) => {
          typesArray.forEach((it) => {
            if (it === elem.type) {
              const prices = [];
              elem.options.forEach((offer) => {
                offer.checked === true ? prices.push(offer.price) : ``;
              })
              prices.push(elem.price);
              return typesAndPriceArray.push({
                type: elem.type,
                price: prices.reduce(reducer)
              })
            }
          })
        })

        typesArray.forEach((type) => {
          const priceArray = [];
          typesAndPriceArray.forEach((element) => {
            if (type === element.type) {
              priceArray.push(element.price);
            }
          })
          numbersArray.push(priceArray.reduce(reducer));
        })
        console.log(this._data)
        console.log(typesArray)
        console.log(numbersArray)
        this._statistics.renderMoneyChart(typesArray, numbersArray);
        break;

      case `transport`:
        const transport = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
        typesArray = Array.from(typeSet);
        typesArray = typesArray.filter((type) => {
          return transport.includes(type);
        });
        
        break;

      case `timeSpent`:

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
  }
}