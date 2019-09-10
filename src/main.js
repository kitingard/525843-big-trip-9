import {Route} from "./components/route";
import {Menu} from "./components/menu";
import {Filter} from "./components/filter";
import {Sort} from "./components/sort";
import {sortEvents, daysData, totalData, routeData} from "./components/data";
import {Day} from "./components/days";
import {Event} from "./components/event";
import {render, Position} from "./components/utils";
import {EventEdit} from "./components/eventEdit";

const routeContainer = document.querySelector(`.trip-info`);
const filtersContainer = document.querySelector(`.trip-main__trip-controls`);
const sortContainer = document.querySelector(`.trip-events`);
const totalCostContainer = document.querySelector(`.trip-info__cost-value`);

const route = new Route(routeData());
const menuu = new Menu();
const filterr = new Filter();
const sort = new Sort();

const renderDay = (data) => {
  const day = new Day(data);
  const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

  render(sortContainer, day.getElement(), Position.BEFOREEND);
  day._events.map((elem) => renderEvent(elem, eventsContainer));
};

const renderEvent = (evData, container) => {
  const event = new Event(evData);
  const eventEdit = new EventEdit(evData);

  Array.from(event.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn) => btn.addEventListener(`click`, () => {
    container.replaceChild(eventEdit.getElement(), event.getElement());
  }));

  eventEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
  });

  eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
  });

  render(container, event.getElement(), Position.BEFOREEND);
};

sortEvents();

render(routeContainer, route.getElement(), Position.AFTERBEGIN);
render(filtersContainer, menuu.getElement(), Position.BEFOREEND);
render(filtersContainer, filterr.getElement(), Position.BEFOREEND);
render(sortContainer, sort.getElement(), Position.AFTERBEGIN);
totalCostContainer.innerText = totalData();

daysData.map((day) => renderDay(day));
