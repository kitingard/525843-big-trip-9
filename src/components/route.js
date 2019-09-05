export const route = (routeData) => `<div class="trip-info__main">
<h1 class="trip-info__title">${routeData.getRoute()}</h1>

<p class="trip-info__dates">${routeData.getDates()}</p>
</div>`;
