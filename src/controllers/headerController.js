import {Route} from "../components/route";
import {Menu} from "../components/menu";
import {Filter} from "../components/filter";
import {render, Position} from "../components/utils";

export class HeaderController {
  constructor(data) {
    this._data = data;
    this._route = new Route(this._data);
    this._menu = new Menu();
    this._filter = new Filter();
  }

  init() {
    const routeContainer = document.querySelector(`.trip-info`);
    const filtersContainer = document.querySelector(`.trip-main__trip-controls`);
    const totalCostContainer = document.querySelector(`.trip-info__cost-value`);

    render(routeContainer, this._route.getElement(), Position.AFTERBEGIN);
    render(filtersContainer, this._menu.getElement(), Position.BEFOREEND);
    render(filtersContainer, this._filter.getElement(), Position.BEFOREEND);
    totalCostContainer.innerText = this._data.getTotalData();
  }
}
