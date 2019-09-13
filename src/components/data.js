import moment from "moment";
const getRandom = (count) => Math.floor(Math.random() * count);

export class EventMock {
  constructor() {
    this.type = ``;
    this.typeDescription = ``;
    this.city = ``;
    this.startTime = ``;
    this.endTime = ``;
    this.timeDuration = ``;
    this.isFavorite = false;
    this.transfer = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
    this.activity = [`restaurant`, `sightseeing`, `check-in`];
    this.price = [10, 20, 50, 70, 100, 150, 200, 300][getRandom(8)];
    this._cities = [`Sankt-Peterburg`, `Smolensk`, `Moscow`, `Saratov`, `Sochi`];
    this.description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`).sort(() => Math.random() - 0.5).slice(0, getRandom(3)).join(`. `).trim();
    this.options = [
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
    ]
  }
  
  getDuration() {
    const duration = moment.duration(moment(this.endTime).diff(moment(this.startTime)));
    this.timeDuration = duration.as(`milliseconds`);
    return this.timeDuration;
  }

  _getRandomCity() {
    this.city = this._cities[getRandom(5)];
    return this.city;
  }
  
  _getStartTime() {
    this.startTime = Date.now() + 1 + getRandom(3) * 24 * 60 * 60 * 1000;
    return this.startTime;
  }

  _getEndTime() {
    this.endTime = this.startTime + (60 + getRandom(100)) * 60 * 1000;
    return this.endTime;
  }

  _getRandomType() {
    const typesArray = this.transfer.concat(this.activity);
    this.type = typesArray[getRandom(10)];
    return this.type;
  }

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
  }

  setData(data) {
    this.description = data.description;
    this.type = data.type;
    this.city = data.city;
    this.price = data.price;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.isFavorite = data.isFavorite;
    this.options = data.options;
    this.getTypeDescription();
    this.getDuration();
  }

  getData() {
    return {
      type: this.type,
      typeDescription: this.typeDescription,
      city: this.city,
      startTime: this.startTime,
      endTime: this.endTime,
      timeDuration: this.timeDuration,
      isFavorite: this.isFavorite,
      transfer: this.transfer,
      activity: this.activity,
      cities: this._cities,
      price: this.price,
      description: this.description,
      options: this.options,
    }
  }

  init() {
    this._getRandomCity();
    this._getRandomType();
    this._getStartTime();
    this._getEndTime();

    this.getTypeDescription();
    this.getDuration();

    return this.getData();
  }
};
