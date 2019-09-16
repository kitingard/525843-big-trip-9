import {Event} from "./event";
import {EventEdit} from "./eventEdit";

export class EventController {
  constructor(eventData, container, dayData, data) {
    this._container = container;
    this._eventData = eventData;
    this._dayData = dayData;
    this._data = data;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEdit(this._eventData);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._eventEdit.getElement())) {
      this._container.getElement().replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }

  init() {

  }
}
