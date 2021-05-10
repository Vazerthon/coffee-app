import { useContext } from 'react';
import { useHistory } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

import BrewsComponent from '../components/features/Brews';

export default function Brews() {
  const {
    brews,
    beans,
    methods,
    beanFilter,
    setBeanFilter,
    methodFilter,
    setMethodFilter,
  } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const history = useHistory();

  const goToAddPage = () => history.push(routes.add);
  const goToEditPage = (id) => history.push(routes.makeEditPath(id));

  return (
    <BrewsComponent
      brews={brews}
      beans={beans}
      methods={methods}
      beanFilter={beanFilter}
      setBeanFilter={setBeanFilter}
      methodFilter={methodFilter}
      setMethodFilter={setMethodFilter}
      goToAddPage={goToAddPage}
      goToEditPage={goToEditPage}
    />
  );
}
