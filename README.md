# PromiseQueue

Inspired by [Promise Series](https://github.com/terinjokes/promise-series)

```js
const queue = new PromiseQueue();
queue.push(promiseForFile);
queue.push(promiseForSearch);
queue.push(promiseForWrite);

queue.resolve().then((results) => {
    console.log(results);
}).catch((error) => {
    console.log(error);
});
```

##Tasks

~~~ bash
# run unit tests
npm test
# with coverage
npm run test-coverage
# linting and verifying coding style
npm run lint
# building library
npm run build
# building a specific distribution version
git checkout v0.1.5 && npm run build
~~~

