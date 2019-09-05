import moment from "moment";

const getDuration = (end, start) => {
  const duration = moment.duration(moment(end).diff(moment(start)));
  const formatDuration = moment.utc(duration.as(`milliseconds`)).format(`H[H] m[M]`);
  return formatDuration;
};

export const days = (daysData) => daysData.map((day, counter) => `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter + 1}</span>
      <time class="day__date" datetime="${day.date}">${day.date}</time>
    </div>

    <ul class="trip-events__list">
    ${day.events.map((event) => `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${event.getRandomType()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${event.getDescription()}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${moment(event.getStartTime()).format(`HH:mm A`)}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${moment(event.getEndTime()).format(`HH:mm A`)}</time>
            </p>
            <p class="event__duration">${getDuration(event.endTime, event.StartTime)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${event.price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          ${event.options.map((elem) => {
    if (elem.checked) {
      return `<ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">${elem.title}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${elem.price}</span>
                </li>
              </ul>`;
    } else {
      return ``;
    }
  }).join(``)}
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`).join(``)}
    </ul>
  </li>`).join(``);
