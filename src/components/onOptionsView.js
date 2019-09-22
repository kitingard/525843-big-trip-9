export const onOptionsView = (elem) => `<ul class="event__selected-offers">
<li class="event__offer">
  <span class="event__offer-title">${elem.title}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${elem.price}</span>
</li>
</ul>`;
