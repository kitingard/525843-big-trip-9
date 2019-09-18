import {TripController} from "./controllers/tripController";
import {DataController} from "./controllers/dataController";
import {HeaderController} from "./controllers/headerController";
import {EventMock} from "./components/data";

const sortContainer = document.querySelector(`.trip-events`);
const eventMock = new EventMock();
const dataController = new DataController(eventMock);
const headerController = new HeaderController(dataController);
const tripController = new TripController(sortContainer, dataController);

dataController.init();
headerController.init();
tripController.init();
