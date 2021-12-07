import { enhanceTimeout } from '@/utils/common';

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
    expect(typeof res.getTimer()).toBe('number');
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('clears timer', () => {
    res.setTimer(cb, 10);
    res.clearTimer();
    expect(res.getTimer()).toBeUndefined();
  });
});
