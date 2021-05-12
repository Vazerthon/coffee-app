import { useState } from 'react';

const useTick = ({ frequency, onTick }) => {
  const [timerId, setTimerId] = useState(undefined);

  const startTick = () => {
    if (timerId) {
      return undefined;
    }

    const id = setInterval(onTick, frequency);
    setTimerId(id);
    return id;
  }

  const stopTick = () => {
    if (!timerId) {
      return;
    }
    
    clearInterval(timerId);
    setTimerId(undefined);
  }
  
  return {
    startTick,
    stopTick,
  };
};

export default useTick;
