import { useState } from 'react';

const useWakeLock = () => {
  const [lock, setLock] = useState(undefined);
  const clearLock = () => setLock(undefined);

  const wakeLockSupported = 'wakeLock' in navigator;

  if (!wakeLockSupported) {
    return {
      keepAwake: () => {},
      release: () => {},
    };
  }
  

  const keepAwake = () => navigator.wakeLock.request('screen').then(setLock);
  const release = () => lock.release().then(clearLock)
  
  return {
    keepAwake,
    release
  };
};

export default useWakeLock;
