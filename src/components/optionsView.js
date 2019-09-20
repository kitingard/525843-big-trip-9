export const optionsView = () => {
    return this._event.options.map((elem) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${elem.value}-1" type="checkbox" name="event-offer-${elem.value}" ${elem.checked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${elem.value}-1">
        <span class="event__offer-title">${elem.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${elem.price}</span>
      </label>
    </div>`).join(``);
}