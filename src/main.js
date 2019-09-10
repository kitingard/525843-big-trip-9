import {route} from "./components/route";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {sort} from "./components/sort";
import {sortEvents, daysData, totalData, routeData} from "./components/data";
import {Day} from "./components/days";
import {Event} from "./components/event";
import {render, Position, replace} from "./components/utils";
import {EventEdit} from "./components/eventEdit";

const ELEMENTS_COUNT = 1;
const routeContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls h2`);
const filterContainer = document.querySelector(`.trip-controls`);
const sortContainer = document.querySelector(`.trip-events h2`);
const totalCostContainer = document.querySelector(`.trip-info__cost-value`);
// const eventEditElement = [event()];

const renderElement = (container, position, str, data) => {
  if (data) {
    container.insertAdjacentHTML(position, data.map(str).join(``));
  } else {
    container.insertAdjacentHTML(position, new Array(ELEMENTS_COUNT).fill(str()).join(``));
  }
};

// const renderCard = (container, element, data) => {
//   container.insertAdjacentHTML(`beforeend`, element(data));
// };

sortEvents();
renderElement(routeContainer, `afterbegin`, route, [routeData()]);
renderElement(menuContainer, `afterend`, menu);
renderElement(filterContainer, `beforeend`, filter);
renderElement(sortContainer, `afterend`, sort);

const cardsContainer = document.querySelector(`.trip-days`);

// renderElement(cardsContainer, `beforebegin`, eventEdit, eventEditElement);
// daysData.forEach((dayz) => renderCard(cardsContainer, days, dayz));
totalCostContainer.innerText = totalData();

const renderDay = (data) => {

  const day = new Day(data);
  const eventsCont = day.getElement().querySelector(`.trip-events__list`);

  render(cardsContainer, day.getElement(), Position.BEFOREEND);
  day._events.map((elem) => renderEvent(elem, eventsCont));
};

const renderEvent = (evData, container) => {
  const event = new Event(evData);
  const eventEdit = new EventEdit(evData);

  Array.from(event.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn) => btn.addEventListener(`click`, () => {
      container.replaceChild(eventEdit.getElement(), event.getElement());
    })
  );

  eventEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
  });

  eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
  });

  render(container, event.getElement(), Position.BEFOREEND);
};

daysData.map((day) => renderDay(day));
