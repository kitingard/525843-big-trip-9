import {route} from "./components/route";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {sort} from "./components/sort";
import {sortEvents, daysData, totalData, routeData} from "./components/data";
import {Day} from "./components/days";
import {Event} from "./components/event";
import {render, Position} from "./components/utils";
// import {eventEdit} from "./components/eventEdit";

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

  // const onEscKeyDown = (evt) => {
  //   if (evt.key === `Escape` || evt.key === `Esc`) {
  //     // tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
  //     // document.removeEventListener(`keydown`, onEscKeyDown);
  //   }
  // };

  const eventsCont = day.getElement().querySelector(`.trip-events__list`);

  // Array.from(day.getElement().querySelectorAll(`.event__rollup-btn`)).map((btn, index) => btn.addEventListener(`click`, () => {
  //     // tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
  //     day._events[index].eventEdit = true;
  //     console.log(day._events[index])
  //     console.log(btn)
  //     console.log('CLICK');
  //     console.log(data)
  //     render(cardsContainer, day.getEvents(), Position.BEFOREEND);
  //     document.addEventListener(`keydown`, onEscKeyDown);
  //   })
  // );

  render(cardsContainer, day.getElement(), Position.BEFOREEND);
  day._events.map((elem) => renderEvent(elem, eventsCont));
};

const renderEvent = (evData, conta) => {
  const ev = new Event(evData);
  render(conta, ev.getElement(), Position.BEFOREEND);
};

daysData.map((day) => renderDay(day));
