
import {DataController} from "./controllers/dataController";
import {EventMock} from "./components/data";
import {HeaderController} from "./controllers/headerController";
import {render, Position} from "./components/utils";
import {Statistics} from "./components/statistics";
import {TripController} from "./controllers/tripController";

const sortContainer = document.querySelector(`.trip-events`);
const eventMock = new EventMock();
const dataController = new DataController(eventMock);
const headerController = new HeaderController(dataController);
const tripController = new TripController(sortContainer, dataController);
const statistics = new Statistics();
const statisticsContainer = document.querySelector(`.page-body__page-main > .page-body__container`);

dataController.init();
headerController.init();
tripController.init();
render(statisticsContainer, statistics.getElement(), Position.BEFOREEND);
statistics.getElement().classList.add(`visually-hidden`);;

Array.from(document.querySelectorAll(`.trip-tabs__btn`)).forEach((btn) => btn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const getActiveBtn = () => {
    if (btn.classList.contains(`trip-tabs__btn--active`)) {
      return;
    } else {
      Array.from(document.querySelectorAll(`.trip-tabs__btn`)).forEach((elem) => elem.classList.toggle(`trip-tabs__btn--active`));
    }
  };

  switch ((evt.target.innerText).toLowerCase().trim()) {
    case `table`:
      tripController.show();
      statistics.getElement().classList.add(`visually-hidden`);
      getActiveBtn();
      break;
    case `stats`:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      getActiveBtn();
      break;
    default:
      break;
  }
}))

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripController.createEvent();
});
