import { debounce } from '@/utils/common';

describe('debounce util', () => {
  jest.useFakeTimers();
  const cb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('simple mode (leading=false & maxWait=undefined)', () => {
    const debounced = debounce(cb, 500);
    debounced();
    jest.advanceTimersByTime(250);
    debounced();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('run fn for the first time and then waits (leading=true)', () => {
    const debounced = debounce(cb, 500, { leading: true });
    debounced();
    jest.advanceTimersByTime(250);
    debounced();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('run fn for the first time and then waits but no longer than maxWait option (leading=true & maxWait=1000)', () => {
    const debounced = debounce(cb, 500, { leading: true, maxWait: 1000 });
    debounced();
    for (let i = 1; i <= 5; i++) {
      jest.advanceTimersByTime(250);
      debounced();
    }
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});
