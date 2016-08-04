import PromiseQueue from '../../src/index.js';

import expect from 'unexpected';
import sinon from 'sinon';

describe('PromiseQueue', () => {
  let promiseQueue;
  let sinonSandbox;

  beforeEach(() => {
    sinonSandbox = sinon.sandbox.create();
    promiseQueue = new PromiseQueue();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('has a proper interface', () => {
    const { push, resolve } = promiseQueue;
    expect(push, 'to be a function');
    expect(resolve, 'to be a function');
  });

  describe('.push', () => {

  });

  describe('.resolve', () => {
    let testPromise1;
    let testPromise2;
    let testPromise3;

    let testPromiseSpy1;
    let testPromiseSpy2;
    let testPromiseSpy3;

    beforeEach(() => {
      testPromiseSpy1 = sinonSandbox.spy();
      testPromiseSpy2 = sinonSandbox.spy();
      testPromiseSpy3 = sinonSandbox.spy();

      testPromise1 = new Promise((resolve) => {
        setTimeout(() => {
          testPromiseSpy1();
          resolve('result1');
        }, 300);
      });
      testPromise2 = new Promise((resolve) => {
        setTimeout(() => {
          testPromiseSpy2();
          resolve('result2');
        }, 200);
      });
      testPromise3 = new Promise((resolve) => {
        setTimeout(() => {
          testPromiseSpy3();
          resolve('result3');
        }, 100);
      });

      promiseQueue.push(testPromise1);
      promiseQueue.push(testPromise2);
      promiseQueue.push(testPromise3);
    });

    it('returns a promise', () => {
      expect(promiseQueue.resolve().then, 'to be a function');
    });

    it('executes promises while waiting for the previous promise to be resolved', () => {
      return promiseQueue.resolve().then(() => {
        expect(testPromiseSpy1.calledBefore(testPromise2), 'to be true');
        expect(testPromiseSpy2.calledBefore(testPromise3), 'to be true');
      });
    });

    it('resolves with the right order of testPromise results', () => {
      return promiseQueue.resolve().then((results) => {
        expect(results, 'to equal', [
          'result1', 'result2', 'result3'
        ]);
      });
    });

    it('rejects if one promise in queue rejects', () => {
      promiseQueue.push(Promise.reject(new Error('testPromiseError')));
      return expect(promiseQueue.resolve(), 'to be rejected');
    });
  });
});
