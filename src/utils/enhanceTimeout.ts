
type Timer = ReturnType<typeof setTimeout> | undefined;

/**
 * Helper that allows to track timerID
 */
export const enhanceTimeout = (): {
  getTimer: () => Timer;
  clearTimer: Function;
  setTimer: Function;
} => {
  let timerId: Timer;

  return {
    getTimer: () => timerId,
    clearTimer: () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = undefined;
      }
    },
    setTimer: (timerFn: Function, time: number) => {
      timerId = setTimeout(timerFn, time) as unknown as Timer;
    },
  };
};

export default enhanceTimeout;
