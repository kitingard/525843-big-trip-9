const getRandom = (count) => Math.floor(Math.random() * count);

export const cardData = () => ({
  eventType: [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`][getRandom(11)],
  eventDate: Date.now() + 1 + getRandom(7) * 24 * 60 * 60 * 1000,

  price: [10, 20, 50, 70, 100, 150, 200, 300][getRandom(8)],
  city: [`Sankt-Peterburg`, `Smolensk`, `Moscow`, `Saratov`, `Sochi`][getRandom(5)],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`).sort(() => Math.random() - 0.5).slice(0, getRandom(2)),
});
