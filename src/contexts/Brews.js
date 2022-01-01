import { createContext, useState, useMemo, useCallback } from 'react';
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

const ITEMS_PER_PAGE = 10;

export function BrewsProvider({ children }) {
  const [storedBrews, setStoredBrews] = usePersistedState('brews', []);
  const [beanFilter, setBeanFilterState] = useState('');
  const [methodFilter, setMethodFilterState] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filterByBean = useMemo(() => beanFilter ? makeFilterByBean(beanFilter) : alwaysTrue, [beanFilter]);
  const filterByMethod = useMemo(() => methodFilter
    ? makeFilterByMethod(methodFilter)
    : alwaysTrue, [methodFilter]);

  const allBrews = useMemo(() => storedBrews.map(parseStoredBrew).sort(newestFirst), [storedBrews]);
  const filteredBrews = useMemo(() => allBrews.filter(filterByBean).filter(filterByMethod), [allBrews, filterByBean, filterByMethod]);

  const beans = useMemo(() => getUniqueListOfBrewProp('bean', allBrews), [allBrews]);
  const methods = useMemo(() => getUniqueListOfBrewProp('method', allBrews), [allBrews]);

  const indexOfFirstItemOnCurrentPage = useMemo(() => currentPage * ITEMS_PER_PAGE, [currentPage]);
  const currentPageBrews = useMemo(() => filteredBrews.slice(indexOfFirstItemOnCurrentPage, indexOfFirstItemOnCurrentPage + ITEMS_PER_PAGE), [filteredBrews, indexOfFirstItemOnCurrentPage]);
  const goToPreviousPage = useCallback(() => setCurrentPage(Math.max(0, currentPage - 1)), [currentPage]);
  const maxPageNumber = useMemo(() => Math.floor(filteredBrews.length / ITEMS_PER_PAGE), [filteredBrews]);
  const goToNextPage = useCallback(() => setCurrentPage(Math.min(currentPage + 1, maxPageNumber)), [currentPage, maxPageNumber]);
  const resetPageNumber = useCallback(() => setCurrentPage(0), []);

  const setBeanFilter = useCallback((value) => {
    setBeanFilterState(value);
    resetPageNumber();
  }, [resetPageNumber])

  const setMethodFilter = useCallback((value) => {
    setMethodFilterState(value);
    resetPageNumber();
  }, [resetPageNumber])

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
      currentPageBrews,
      goToPreviousPage,
      goToNextPage,
      currentPage,
    }
  }, [allBrews, beanFilter, beans, currentPage, currentPageBrews, filteredBrews, goToNextPage, goToPreviousPage, methodFilter, methods, setBeanFilter, setMethodFilter, setStoredBrews]);

  return (
    <BrewsContext.Provider value={value}>{children}</BrewsContext.Provider>
  );
}

BrewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
