
import {DataController} from "./controllers/dataController";
import {EventMock} from "./components/data";
import {HeaderController} from "./controllers/headerController";
import {StatisticsController} from "./controllers/statisticsController";
import {TripController} from "./controllers/tripController";
import {DataModel} from "./models/dataModel";

const sortContainer = document.querySelector(`.trip-events`);
const eventMock = new EventMock();
const dataController = new DataController(eventMock);
const headerController = new HeaderController(dataController);
const statisticsController = new StatisticsController(dataController);
const tripController = new TripController(sortContainer, dataController, headerController, statisticsController);

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

const AUTHORIZATION = `Basic dXNlckBwYXNzd=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;
const data = new DataModel({endPoint: END_POINT, authorization: AUTHORIZATION});

const ev = {
  'base_price': 222,
  'date_from': `2019-07-10T22:55:56.845Z`,
  'date_to': `2019-07-11T11:22:13.375Z`,
  'destination': {
    'description': `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
    'name': `Chamonix`,
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=0.0762563005163317`,
        'description': `Chamonix parliament building`
      }
    ]
  },
  'is_favorite': false,
  'offers': [
    {'name': `Infotainment system`, 'title': `Infotainment system`, 'price': 40},
    {'name': `Order meal`, 'title': `Order meal`, 'price': 180}
  ],
  'type': `taxi`,
};

data.getEvents();

data.createEvent(ev);

data.getEvents();


// console.log(`getEvent`, data.getEvents())
