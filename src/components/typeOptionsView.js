const typeOptionsView = (event) => {
    return `<fieldset class="event__type-group">
<legend class="visually-hidden">Transfer</legend>
  ${event.transfer.map((elem) => `<div class="event__type-item">
    <input id="event-type-${elem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem}" ${elem === this._event.type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${elem}" for="event-type-${elem}-1">${elem}</label>
  </div>`).join(``)}
</fieldset>

<fieldset class="event__type-group">
  <legend class="visually-hidden">Activity</legend>
  ${event.activity.map((element) => `<div class="event__type-item">
  <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${element === this._event.type ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
</div>`).join(``)}
</fieldset>`;
}
