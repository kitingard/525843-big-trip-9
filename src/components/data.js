import moment from "moment";

const getRandom = (count) => Math.floor(Math.random() * count);

export const event = function () {
  return {
    type: ``,
    city: ``,
    startTime: ``,
    endTime: ``,
    types: [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`],
    price: [10, 20, 50, 70, 100, 150, 200, 300][getRandom(8)],
    cities: [`Sankt-Peterburg`, `Smolensk`, `Moscow`, `Saratov`, `Sochi`],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`).sort(() => Math.random() - 0.5).slice(0, getRandom(3)).join(`. `).trim(),
    options: [
      {
        title: `Add luggage`,
        price: 30,
        checked: false,
      },
      {
        title: `Switch to comfort class`,
        price: 100,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        title: `Add meal`,
        price: 15,
        checked: false,
      },
      {
        title: `Choose seats`,
        price: 5,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        title: `Travel by train`,
        price: 40,
        checked: false,
      },
    ],
    getRandomCity() {
      this.city = this.cities[getRandom(5)];
      return this.city;
    },
    getStartTime() {
      this.startTime = Date.now() + 1 + getRandom(3) * 24 * 60 * 60 * 1000;
      return this.startTime;
    },
    getEndTime() {
      this.endTime = this.startTime + (60 + getRandom(100)) * 60 * 1000;
      return this.endTime;
    },
    getRandomType() {
      this.type = this.types[getRandom(11)];
      return this.type;
    },
    getDescription() {
      const typeDescriptions = new Map([
        [`bus`, `Bus to ${this.getRandomCity()}`],
        [`check-in`, `Check into hotel`],
        [`drive`, `Drive to ${this.getRandomCity()}`],
        [`flight`, `Flight to ${this.getRandomCity()}`],
        [`restaurant`, `Dinner in ${this.getRandomCity()}`],
        [`ship`, `Sailing in ${this.getRandomCity()}`],
        [`sightseeing`, `Natural History Museum in ${this.getRandomCity()}`],
        [`taxi`, `Taxi to airport`],
        [`train`, `Train to ${this.getRandomCity()}`],
        [`transport`, `Transport to ${this.getRandomCity()}`],
        [`trip`, `Trip to ${this.getRandomCity()}`]
      ]);
      return typeDescriptions.get(this.type);
    }
  };
};

const eventsData = new Array(9).fill(``).map(event);
const sortDates = ((a, b) => moment(a).format(`X`) - moment(b).format(`X`));
export const daysData = [];

export const sortEvents = () => {
  let array = [];
  eventsData.map((element) => {
    element.getRandomCity();
    element.getRandomType();
    element.getStartTime();
    element.getEndTime();
    array.push(moment(element.startTime).format(`MMM D`));
  });
  const startTimeSet = new Set(array.sort(sortDates));
  startTimeSet.forEach((time) => {
    let events = [];
    events = eventsData.filter((elem) => {
      return moment(elem.startTime).format(`MMM D`) === time;
    });
    daysData.push([{date: time, events}]);
  });
};

