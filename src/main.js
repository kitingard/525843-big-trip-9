import {Route} from "./components/route";
import {Menu} from "./components/menu";
import {Filter} from "./components/filter";
// import {Sort} from "./components/sort";
// import {sortEvents, daysData, totalData, routeData} from "./components/data";
// import {Day} from "./components/days";
// import {Event} from "./components/event";
import {render, Position} from "./components/utils";
// import {EventEdit} from "./components/eventEdit";
import {TripController} from "./components/tripController";
import {eventMock} from "./components/data";

const routeContainer = document.querySelector(`.trip-info`);
const filtersContainer = document.querySelector(`.trip-main__trip-controls`);
const sortContainer = document.querySelector(`.trip-events`);
const totalCostContainer = document.querySelector(`.trip-info__cost-value`);

const tripController = new TripController(sortContainer, eventMock);
tripController.sortEvents();

const route = new Route(tripController);
const menuu = new Menu();
const filter = new Filter();
// const sort = new Sort();

// const renderDay = (data) => {
//   const day = new Day(data);
//   const eventsContainer = day.getElement().querySelector(`.trip-events__list`);

//   render(sortContainer, day.getElement(), Position.BEFOREEND);
//   day._events.map((elem) => renderEvent(elem, eventsContainer));
// };

// const renderEvent = (evData, container) => {
//   const event = new Event(evData);
//   const eventEdit = new EventEdit(evData);

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       container.replaceChild(event.getElement(), eventEdit.getElement());
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   Array.from(event.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn) => btn.addEventListener(`click`, () => {
//     container.replaceChild(eventEdit.getElement(), event.getElement());
//     document.addEventListener(`keydown`, onEscKeyDown);
//   }));

//   eventEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
//     container.replaceChild(event.getElement(), eventEdit.getElement());
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
//     container.replaceChild(event.getElement(), eventEdit.getElement());
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(container, event.getElement(), Position.BEFOREEND);
// };

// const tripController = new TripController(eventMock);

// sortEvents();

render(routeContainer, route.getElement(), Position.AFTERBEGIN);
render(filtersContainer, menuu.getElement(), Position.BEFOREEND);
render(filtersContainer, filter.getElement(), Position.BEFOREEND);
// render(sortContainer, sort.getElement(), Position.AFTERBEGIN);

tripController.init();
totalCostContainer.innerText = tripController.totalData();

// tripController.daysData.map((day) => renderDay(day));
