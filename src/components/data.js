const getRandom = (count) => Math.floor(Math.random() * count);

export const cardData = () => ({
  eventsDate: Date.now() + 1 + getRandom(2) * 24 * 60 * 60 * 1000,
  event: {
    type: [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`][getRandom(11)],
    price: [10, 20, 50, 70, 100, 150, 200, 300][getRandom(8)],
    city: [`Sankt-Peterburg`, `Smolensk`, `Moscow`, `Saratov`, `Sochi`][getRandom(5)],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`).sort(() => Math.random() - 0.5).slice(0, getRandom(2)),
    getDescription() {
      switch (this.type) {
        case `bus`:
          return `Bus to ${this.city}`;
        case `check-in`:
          return `Check into hotel`;
        case `drive`:
          return `Drive to ${this.city}`;
        case `flight`:
          return `Flight to ${this.city}`;
        case `restaurant`:
          return `Dinner in ${this.city}`;
        case `ship`:
          return `Shopping in ${this.city}`;
        case `sightseeing`:
          return `Natural History Museum in ${this.city}`;
        case `taxi`:
          return `Taxi to airport`;
        case `train`:
          return `Train to ${this.city}`;
        case `transport`:
          return `Transport to ${this.city}`;
        case `trip`:
          return `Trip to ${this.city}`;
      }
    }
  }
});
