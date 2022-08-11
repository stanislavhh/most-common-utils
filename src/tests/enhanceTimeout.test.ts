import {enhanceTimeout} from '../utils';

describe('enhanceTimeout util', () => {
  const res = enhanceTimeout();
  const cb = jest.fn();

  jest.useFakeTimers();

  it('returns enhanced timeout obj', () => {
    expect(Object.keys(res)).toEqual(['getTimer', 'clearTimer', 'setTimer']);
  });

  it('gets and sets timers', () => {
    expect(res.getTimer()).toBeUndefined();
    res.setTimer(cb, 10);
    // Environment is node so timerId is object
    expect(typeof res.getTimer()).toBe('object');
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('clears timer', () => {
    res.setTimer(cb, 10);
    res.clearTimer();
    expect(res.getTimer()).toBeUndefined();
  });
});
