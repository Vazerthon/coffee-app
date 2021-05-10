import { useContext } from 'react';
import { useHistory } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

import BrewsComponent from '../components/features/Brews';
import Welcome from '../components/Welcome';
import { H1 } from '../components/Typography';

export default function Brews() {
  const {
    allBrews,
    filteredBrews,
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
  const haveBrews = allBrews.length > 0;

  return (
    <>
      {!haveBrews && (
        <>
          <H1>Welcome!</H1>
          <Welcome />
        </>
      )}
      {haveBrews && (
        <>
          <H1>Brews</H1>
          <BrewsComponent
            brews={filteredBrews}
            beans={beans}
            methods={methods}
            beanFilter={beanFilter}
            setBeanFilter={setBeanFilter}
            methodFilter={methodFilter}
            setMethodFilter={setMethodFilter}
            goToAddPage={goToAddPage}
            goToEditPage={goToEditPage}
          />
        </>
      )}
    </>
  );
}
