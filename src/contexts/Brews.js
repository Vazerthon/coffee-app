import { createContext, useState, useMemo } from 'react';
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
  starred: false,
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
  starred,
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
  starred,
});

const parseStoredBrew = ({
  dateTime,
  groundsWeight,
  grindSize,
  waterWeight,
  waterTemperature,
  brewTime,
  taste,
  ...rest
}) => ({
  dateTime: new Date(dateTime),
  groundsWeight: Number.parseInt(groundsWeight, 10),
  grindSize: Number.parseInt(grindSize, 10),
  waterWeight: Number.parseInt(waterWeight, 10),
  waterTemperature: Number.parseInt(waterTemperature, 10),
  brewTime: Number.parseInt(brewTime, 10),
  taste: Number.parseInt(taste, 10),
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

export function BrewsProvider({ children }) {
  const [storedBrews, setStoredBrews] = usePersistedState('brews', []);
  const [beanFilter, setBeanFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  const filterByBean = useMemo(() => beanFilter ? makeFilterByBean(beanFilter) : alwaysTrue, [beanFilter]);
  const filterByMethod = useMemo(() => methodFilter
    ? makeFilterByMethod(methodFilter)
    : alwaysTrue, [methodFilter]);

  const allBrews = useMemo(() => storedBrews.map(parseStoredBrew).sort(newestFirst), [storedBrews]);
  const filteredBrews = useMemo(() => allBrews.filter(filterByBean).filter(filterByMethod), [allBrews, filterByBean, filterByMethod]);

  const beans = useMemo(() => getUniqueListOfBrewProp('bean', allBrews), [allBrews]);
  const methods = useMemo(() => getUniqueListOfBrewProp('method', allBrews), [allBrews]);

  const value = useMemo(() => {
    const addBrew = (brew) => setStoredBrews([...allBrews, brew]);
    const updateBrew = (brew) =>
      setStoredBrews([...allBrews.filter((b) => b.id !== brew.id), brew]);
    const overwriteAllBrews = setStoredBrews;

    const getBrewsOfBean = (bean) => allBrews.filter(makeFilterByBean(bean));

    return {
      allBrews,
      filteredBrews,
      beans,
      methods,
      addBrew,
      updateBrew,
      defaultBrew,
      makeBrew,
      beanFilter,
      setBeanFilter,
      methodFilter,
      setMethodFilter,
      overwriteAllBrews,
      getBrewsOfBean,
    }
  }, [allBrews, beanFilter, beans, filteredBrews, methodFilter, methods, setStoredBrews]);

  return (
    <BrewsContext.Provider value={value}>{children}</BrewsContext.Provider>
  );
}

BrewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
