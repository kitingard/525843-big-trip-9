import moment from "moment";

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const sortDates = ((a, b) => moment(a, `X`) - moment(b, `X`));

export const sortNumbers = (((a, b) => a - b));

export const getTypeDescription = ((type) => {
  const typeDescriptions = new Map([
    [`bus`, `Bus to `],
    [`check-in`, `Check-in in `],
    [`drive`, `Drive to `],
    [`flight`, `Flight to `],
    [`restaurant`, `Dinner in `],
    [`ship`, `Sailing in `],
    [`sightseeing`, `Sightseeing in `],
    [`taxi`, `Taxi to `],
    [`train`, `Train to `],
    [`transport`, `Transport to `]
  ]);
  return typeDescriptions.get(type);
});
