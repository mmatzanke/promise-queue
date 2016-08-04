export default class PromiseQueue {
  constructor() {
    this._promiseQueue = [];
  }

  push(promise) {
    this._promiseQueue.push(promise);
  }

  resolve() {
    const { _promiseQueue } = this;
    const results = [];
    let previous;

    return new Promise((resolve, reject) => {
      while (_promiseQueue.length) {
        const promise = _promiseQueue.shift();

        if (!previous) {
          previous = promise;
          continue;
        }
        previous = previous.then((result) => {
          results.push(result);
          return promise;
        }).catch(error => {
          reject(error);
        });
      }

      return previous.then((lastResult) => {
        results.push(lastResult);
        resolve(results);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
