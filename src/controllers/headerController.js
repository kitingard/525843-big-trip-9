import {Route} from "../components/route";
import {Menu} from "../components/menu";
import {render, Position} from "../components/utils";

export class HeaderController {
  constructor(data) {
    this._data = data;
    this._route = new Route(this._data);
    this._menu = new Menu();
    this._routeContainer = document.querySelector(`.trip-info`);
    this._totalCostContainer = document.querySelector(`.trip-info__cost-value`);
    this._menuContainer = document.querySelector(`.trip-main__trip-controls`);
  }

  reloadData(newData) {
    this._data = newData;
    this._route.removeElement();
    this._route.setData(this._data);
    render(this._routeContainer, this._route.getElement(), Position.AFTERBEGIN);

    this._totalCostContainer.innerText = ``;
    this._totalCostContainer.innerText = this._data.getTotalData();
  }

  init() {
    render(this._routeContainer, this._route.getElement(), Position.AFTERBEGIN);
    render(this._menuContainer, this._menu.getElement(), Position.BEFOREEND);
    this._totalCostContainer.innerText = this._data.getTotalData();
  }
}
