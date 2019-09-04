import {route} from "./components/route";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {sort} from "./components/sort";
import {event, sortEvents, daysData} from "./components/data";
import {days} from "./components/days";
import {cardForm} from "./components/cardForm";

const ELEMENTS_COUNT = 1;
const routeContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls h2`);
const filterContainer = document.querySelector(`.trip-controls`);
const sortContainer = document.querySelector(`.trip-events h2`);
const cardFormElement = [event()];

const renderElement = (container, position, str, data) => {
  if (data) {
    container.insertAdjacentHTML(position, data.map(str).join(``));
  } else {
    container.insertAdjacentHTML(position, new Array(ELEMENTS_COUNT).fill(str()).join(``));
  }
};

const renderCard = (container, element) => {
  sortEvents();
  container.insertAdjacentHTML(`beforeend`, daysData.map(element).join(``));
};

renderElement(routeContainer, `afterbegin`, route);
renderElement(menuContainer, `afterend`, menu);
renderElement(filterContainer, `beforeend`, filter);
renderElement(sortContainer, `afterend`, sort);

const cardsContainer = document.querySelector(`.trip-days`);

renderElement(cardsContainer, `beforebegin`, cardForm, cardFormElement);
renderCard(cardsContainer, days);
