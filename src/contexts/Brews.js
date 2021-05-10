import { createContext, useState } from 'react';
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
  technique: '',
  taste: 0,
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
  technique,
  taste,
  notes,
  dateTime,
}) => ({
  id: uuidv4(),
  bean,
  method,
  groundsWeight,
  grindSize,
  waterWeight,
  waterTemperature,
  brewTime,
  technique,
  taste,
  notes,
  dateTime,
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
  groundsWeight: Number.parseInt(groundsWeight, 10),
  grindSize: Number.parseInt(grindSize, 10),
  waterWeight: Number.parseInt(waterWeight, 10),
  waterTemperature: Number.parseInt(waterTemperature, 10),
  brewTime: Number.parseInt(brewTime, 10),
  ...rest,
});

const areEqual = (a, b) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0;
const alwaysTrue = () => true;
const prop = (key) => (obj) => obj[key];
const lowercase = (string) => string.toLowerCase();
const unique = (array) => [...new Set(array)];
const noFalsey = Boolean;
const getUniqueListOfBrewProp = (propName, brews) =>
  unique(brews.map(prop(propName)).filter(noFalsey).map(lowercase));
const newestFirst = (a, b) => b.dateTime - a.dateTime;
const makeFilterByBean = (beanFilter) => ({ bean }) =>
  areEqual(beanFilter, bean);
const makeFilterByMethod = (methodFilter) => ({ method }) =>
  areEqual(methodFilter, method);

export const BrewsProvider = ({ children }) => {
  const [storedBrews, setStoredBrews] = usePersistedState('brews', []);
  const [beanFilter, setBeanFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  const filterByBean = beanFilter ? makeFilterByBean(beanFilter) : alwaysTrue;
  const filterByMethod = methodFilter
    ? makeFilterByMethod(methodFilter)
    : alwaysTrue;

  const allBrews = storedBrews.map(parseStoredBrew).sort(newestFirst);
  const filteredBrews = allBrews.filter(filterByBean).filter(filterByMethod);
  const addBrew = (brew) => setStoredBrews([...allBrews, brew]);
  const updateBrew = (brew) =>
    setStoredBrews([...allBrews.filter((b) => b.id !== brew.id), brew]);

  const beans = getUniqueListOfBrewProp('bean', allBrews);
  const methods = getUniqueListOfBrewProp('method', allBrews);
  const techniques = getUniqueListOfBrewProp('technique', allBrews);

  const value = {
    allBrews,
    filteredBrews,
    beans,
    methods,
    techniques,
    addBrew,
    updateBrew,
    defaultBrew,
    makeBrew,
    beanFilter,
    setBeanFilter,
    methodFilter,
    setMethodFilter,
  };

  return (
    <BrewsContext.Provider value={value}>{children}</BrewsContext.Provider>
  );
};

BrewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
