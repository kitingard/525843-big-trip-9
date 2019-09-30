import {AbstractComponent} from "./abstract-component";

export class Route extends AbstractComponent {
  constructor(routeData) {
    super();
    this._routeData = routeData;
  }

  setData(newData) {
    this._routeData = newData;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._routeData.getRoute()}</h1>

    <p class="trip-info__dates">${this._routeData.getDates()}</p>
    </div>`;
  }
}
