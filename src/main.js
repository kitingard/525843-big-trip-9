import {route} from "./components/route";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {sort} from "./components/sort";
import {cardData} from "./components/data";
import {card} from "./components/card";
import {cardForm} from "./components/cardForm";


const ELEMENTS_COUNT = 1;
const CARDS_COUNT = 3;

const routeContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls h2`);
const filterContainer = document.querySelector(`.trip-controls`);
const sortContainer = document.querySelector(`.trip-events h2`);

const cardsArray = new Array(CARDS_COUNT).fill(``).map(cardData);

const renderElement = (container, position, str) => {
  container.insertAdjacentHTML(position, new Array(ELEMENTS_COUNT).fill(str()).join(``));
};

const renderCard = (container, element) => {
  container.insertAdjacentHTML(`beforeend`, cardsArray.map(element).join(``));
};

renderElement(routeContainer, `afterbegin`, route);
renderElement(menuContainer, `afterend`, menu);
renderElement(filterContainer, `beforeend`, filter);
renderElement(sortContainer, `afterend`, sort);

const cardsContainer = document.querySelector(`.trip-days`);

renderElement(cardsContainer, `beforebegin`, cardForm);
renderCard(cardsContainer, card);
