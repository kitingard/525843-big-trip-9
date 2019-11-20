const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

// const toJSON = (response) => {
//   console.log(response.json(), `reeeees`)
//   return response.json();
// };

export class DataModel {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }


  getEvents() {
    return this._load({url: `points`});
    // .then((response) => response.json())
    // .then((value) => console.log(`value -- `, value));
  }

  createEvent(event) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  updateEvent({id, event}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    // console.log(`autoriz`, this._authorization)
    // console.log(`body`, body)

    // console.log(`url`, url, `method`, method, `body`, body, `headers`, headers)

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      // .then((response) => response.json().then(body => console.log(body)))
      .catch((err) => {
        // console.error(`fetch error: ${err}`)
        throw err;
      });
  }
}
