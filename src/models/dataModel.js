const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // console.log(`response`, response)
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

  _load(url) {
    const headers = new Headers();

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method: Method.GET, body: null, headers})
      .then(checkStatus)
      .catch((err) => {
        // console.error(`fetch error: ${err}`)
        throw err;
      });
  }
}
