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
    this._routeContainer = document.querySelector(`.trip-info`);
    this._totalCostContainer = document.querySelector(`.trip-info__cost-value`);
    this._filtersContainer = document.querySelector(`.trip-main__trip-controls`);
  }

  init() {
    render(this._routeContainer, this._route.getElement(), Position.AFTERBEGIN);
    render(this._filtersContainer, this._menu.getElement(), Position.BEFOREEND);
    render(this._filtersContainer, this._filter.getElement(), Position.BEFOREEND);
    this._totalCostContainer.innerText = this._data.getTotalData();
  }
}
