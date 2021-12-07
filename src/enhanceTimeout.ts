/**
 * Helper that allows to track timerID
 */
export const enhanceTimeout = (): {
  getTimer: Function;
  clearTimer: Function;
  setTimer: Function;
} => {
  let timerId: number | undefined;

  return {
    getTimer: () => timerId,
    clearTimer: () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = undefined;
      }
    },
    setTimer: (timerFn: Function, time: number) => {
      timerId = setTimeout(timerFn, time);
    },
  };
};

export default enhanceTimeout;
