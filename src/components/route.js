import {createElement} from "./utils";

export class Route {
  constructor(routeData) {
    this._routeData = routeData;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._routeData.getRoute()}</h1>
    
    <p class="trip-info__dates">${this._routeData.getDates()}</p>
    </div>`;
  }
}
