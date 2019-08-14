import {route} from "./components/route";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {sort} from "./components/sort";
import {card} from "./components/card";
import {cardForm} from "./components/cardForm";

const ELEMENTS_COUNT = 1;
const CARDS_COUNT = 3;

const routeContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls h2`);
const filterContainer = document.querySelector(`.trip-controls`);
const sortContainer = document.querySelector(`.trip-events h2`);

const renderElement = (container, position, str, count) => {
  container.insertAdjacentHTML(position, new Array(count).fill(str()).join(``));
};

renderElement(routeContainer, `afterbegin`, route, ELEMENTS_COUNT);
renderElement(menuContainer, `afterend`, menu, ELEMENTS_COUNT);
renderElement(filterContainer, `beforeend`, filter, ELEMENTS_COUNT);
renderElement(sortContainer, `afterend`, sort, ELEMENTS_COUNT);

const cardsContainer = document.querySelector(`.trip-days`);

renderElement(cardsContainer, `beforebegin`, cardForm, ELEMENTS_COUNT);
renderElement(cardsContainer, `beforeend`, card, CARDS_COUNT);