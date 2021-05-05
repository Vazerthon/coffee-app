import { createContext } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import usePersistedState from '../hooks/usePersistedState';

export const BrewsContext = createContext();

const defaultBrew = {
  bean: '',
  method: '',
  groundsWeight: 0,
  grindSize: 0,
  waterWeight: 0,
  waterTemperature: 0,
  brewTime: 0,
  notes: '',
  dateTime: new Date(),
};

const makeBrew = ({
  bean,
  method,
  groundsWeight,
  grindSize,
  waterWeight,
  waterTemperature,
  brewTime,
  notes,
  dateTime,
} = defaultBrew) => ({
  id: uuidv4(),
  dateTime,
  bean,
  method,
  groundsWeight,
  grindSize,
  waterWeight,
  waterTemperature,
  brewTime,
  notes,
});

const parseStoredBrew = ({
  dateTime,
  groundsWeight,
  grindSize,
  waterWeight,
  waterTemperature,
  brewTime,
  ...rest
}) => ({
  dateTime: new Date(dateTime),
  groundsWeight: Number.parseInt(groundsWeight),
  grindSize: Number.parseInt(grindSize),
  waterWeight: Number.parseInt(waterWeight),
  waterTemperature: Number.parseInt(waterTemperature),
  brewTime: Number.parseInt(brewTime),
  ...rest,
});

const prop = (key) => (obj) => obj[key];
const lowercase = (string) => string.toLowerCase();
const unique = (array) => [...new Set(array)];
const getUniqueListOfBrewProp = (propName, brews) =>
  unique(brews.map(prop(propName)).map(lowercase));
const newestFirst = (a, b) => b.dateTime - a.dateTime;

export const BrewsProvider = ({ children }) => {
  const [storedBrews, setStoredBrews] = usePersistedState('brews', []);
  const brews = storedBrews.map(parseStoredBrew).sort(newestFirst);
  const addBrew = (brew) => setStoredBrews([...brews, brew]);
  const beans = getUniqueListOfBrewProp('bean', brews);
  const methods = getUniqueListOfBrewProp('method', brews);

  const value = {
    brews,
    beans,
    methods,
    addBrew,
    makeBrew,
  };

  return (
    <BrewsContext.Provider value={value}>{children}</BrewsContext.Provider>
  );
};

BrewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
