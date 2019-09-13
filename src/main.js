import {TripController} from "./components/tripController";
import {DataController} from "./components/dataController";
import {HeaderController} from "./components/headerController";
import {EventMock} from "./components/data";

const sortContainer = document.querySelector(`.trip-events`);
const eventMock = new EventMock();
const dataController = new DataController(eventMock);
const headerController = new HeaderController(dataController);
const tripController = new TripController(sortContainer, dataController.getSortedData());

dataController.init();
headerController.init();
tripController.init();
