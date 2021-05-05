import { useState } from 'react';
import useKeyValueStore from './useKeyValueStore';

const usePersistedState = (key, initial) => {
  const { getItem, setItem } = useKeyValueStore();
  const storeInitialValue = (value) => {
    setItem(key, value);
    return value;
  };
  const initialValue = getItem(key) || storeInitialValue(initial);

  const [value, setValue] = useState(initialValue);

  const setAndPersist = (newValue) => {
    setValue(newValue);
    setItem(key, newValue);
  }

  return [value, setAndPersist];
};

export default usePersistedState;
