
import {DataController} from "./controllers/dataController";
import {EventMock} from "./components/data";
import {HeaderController} from "./controllers/headerController";
import {render, Position} from "./components/utils";
import {StatisticsController} from "./controllers/statisticsController";
import {TripController} from "./controllers/tripController";

const sortContainer = document.querySelector(`.trip-events`);
const eventMock = new EventMock();
const dataController = new DataController(eventMock);
const headerController = new HeaderController(dataController);
const tripController = new TripController(sortContainer, dataController, headerController);
const statisticsController = new StatisticsController(dataController);

dataController.init();
headerController.init();
tripController.init();
statisticsController.init();

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
      statisticsController.hide();
      getActiveBtn();
      break;
    case `stats`:
      tripController.hide();
      statisticsController.show();
      getActiveBtn();
      break;
    default:
      break;
  }
}));

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripController.createEvent();
});
