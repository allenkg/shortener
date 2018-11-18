
const linksURL = '/api/links';

export default class Api {

  testData() {
    console.log('fetch test data');
    return new Promise((resolve) => {
      const data =  this.makeRequest('GET', linksURL);
      resolve(data)
    })
  }

  convertUrl(payload) {
    return new Promise((resolve) => {
      const data = this.makeRequest('PUT', linksURL, payload);
      resolve(data)
    })
  }

  createUrl(payload) {
    return new Promise((resolve) => {
      const data = this.makeRequest('PUT', linksURL, payload);
      resolve(data)
    })
  }

  makeRequest(method, url) {
    let fetchParams = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, fetchParams)
      .then(this.validateStatusCode)
      .catch(this.onResponseInvalid)
  }

  validateStatusCode(response) {
    return new Promise((resolve, reject) => {
      const status = response.status;
      const next = status < 400 ? resolve : reject;
      response.text().then(next);
    });
  }

  onResponseInvalid(payload) {
    return new Promise((resolve, reject) => reject(this.parsePayload(payload)))
  }

  parsePayload(payload) {
    try {
      return JSON.parse(payload);
    } catch (err) {
      return payload;
    }
  }

}
