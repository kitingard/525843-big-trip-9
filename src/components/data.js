import moment from "moment";

const getRandom = (count) => Math.floor(Math.random() * count);

export const event = function () {
  return {
    type: ``,
    typeDescription: ``,
    city: ``,
    startTime: ``,
    endTime: ``,
    transfer: [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`],
    activity: [`restaurant`, `sightseeing`, `check-in`],
    price: [10, 20, 50, 70, 100, 150, 200, 300][getRandom(8)],
    cities: [`Sankt-Peterburg`, `Smolensk`, `Moscow`, `Saratov`, `Sochi`],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`).sort(() => Math.random() - 0.5).slice(0, getRandom(3)).join(`. `).trim(),
    options: [
      {
        value: `luggage`,
        title: `Add luggage`,
        price: 30,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        value: `class`,
        title: `Switch to comfort class`,
        price: 100,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        value: `meal`,
        title: `Add meal`,
        price: 15,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        value: `seats`,
        title: `Choose seats`,
        price: 5,
        checked: Boolean(Math.round(Math.random())),
      },
      {
        value: `train`,
        title: `Travel by train`,
        price: 40,
        checked: Boolean(Math.round(Math.random())),
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
      const typesArray = this.transfer.concat(this.activity);
      this.type = typesArray[getRandom(10)];
      return this.type;
    },
    getTypeDescription() {
      const typeDescriptions = new Map([
        [`bus`, `Bus to `],
        [`check-in`, `Check into `],
        [`drive`, `Drive to `],
        [`flight`, `Flight to `],
        [`restaurant`, `Dinner in `],
        [`ship`, `Sailing in `],
        [`sightseeing`, `Museum in `],
        [`taxi`, `Taxi to `],
        [`train`, `Train to `],
        [`transport`, `Transport to `]
      ]);
      this.typeDescription = typeDescriptions.get(this.type);
      return this.typeDescription + this.city;
    },
  };
};

const eventsData = new Array(9).fill(``).map(event);
const sortDates = ((a, b) => moment(a, `X`) - moment(b, `X`));
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
  Array.from(startTimeSet).forEach((time, index) => {
    let events = [];
    events = eventsData.filter((elem) => {
      return moment(elem.startTime).format(`MMM D`) === time;
    });
    daysData.push({date: time, counter: index + 1, events});
  });
};

export const totalData = () => {
  let priceArray = [];
  daysData.map((day) => {
    day.events.map((ev) => {
      priceArray.push(ev.price);
      ev.options.map((option) => {
        if (option.checked) {
          priceArray.push(option.price);
        }
      });
    });
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return priceArray.reduce(reducer);
};

export const routeData = function () {
  return {
    getDates() {
      const first = daysData[0].date;
      const last = daysData[daysData.length - 1].date;
      return first.slice(0, 3) === last.slice(0, 3) ? first + ` - ` + last.slice(3) : first + ` - ` + last;
    },
    getRoute() {
      const citiesArray = [];
      daysData.map((day) => {
        day.events.map((eve) => {
          citiesArray.push(eve.city);
        });
      });
      return citiesArray.length <= 3 ? citiesArray.join(` &mdash; `) : citiesArray[0] + ` &mdash; ... &mdash; ` + citiesArray[citiesArray.length - 1];
    },
  };
};
