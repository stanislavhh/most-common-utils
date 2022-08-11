import {enhanceTimeout} from './enhanceTimeout';

/**
 * Lodash debounce analog fn
 */
export const debounce = (
  fn: Function,
  ms = 0,
  options?: {leading?: boolean; maxWait?: number},
) => {
  const {leading = false, maxWait} = options || {};

  const {
    getTimer: mainTimer,
    setTimer: setMainTimer,
    clearTimer: clearMainTimer,
  } = enhanceTimeout();
  const {
    getTimer: waitTimer,
    setTimer: setWaitTimer,
    clearTimer: clearWaitTimer,
  } = enhanceTimeout();
  const {
    getTimer: maxWaitTimer,
    setTimer: setMaxWaitTimer,
    clearTimer: clearMaxWaitTimer,
  } = enhanceTimeout();

  const callFn = (args: any[]) => {
    fn(...args);
    clearMainTimer();
    clearMaxWaitTimer();
    setWaitTimer(clearWaitTimer, ms);
  };

  const setFnTimerCall = (args: any[]) => {
    clearMainTimer();
    setMainTimer(() => callFn(args), ms);
  };

  return (...args: any[]) => {
    if (maxWait && !maxWaitTimer()) {
      setMaxWaitTimer(() => callFn(args), maxWait);
    }

    if (leading) {
      if (!mainTimer() && !waitTimer()) {
        callFn(args);
      } else {
        setFnTimerCall(args);
      }
      return;
    }

    setFnTimerCall(args);
  };
};

export default debounce;
