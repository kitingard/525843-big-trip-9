const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // console.log(`response`, response.json().then(body => console.log(body)))
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export class DataModel {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  createEvent(task) {
    // console.log(JSON.stringify(task))
    return this._load({
      url: `destinations`,
      method: Method.GET,
      body: JSON.stringify(task),
      headers: new Headers()
    });
  }

  _load({url, method, body, headers}) {
    // const headers = new Headers();

    // console.log(`url`, url, `method`, method, `body`, body, `headers`, headers)

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // console.error(`fetch error: ${err}`)
        throw err;
      });
  }
}
