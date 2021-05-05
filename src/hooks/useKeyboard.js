const useKeyboard = (strategies = {}) => {
  const onKeyboardEvent = (event) => {
    const noop = () => {};
    const fn = strategies[event.key] || noop;
    fn(event);
  };

  return {
    onKeyboardEvent,
  };
};

export default useKeyboard;
