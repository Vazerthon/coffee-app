import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

import BrewsComponent from '../components/features/Brews';
import Welcome from '../components/Welcome';
import Wrapper from './Wrapper';

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
    updateBrew,
  } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const navigate = useNavigate();

  const goToAddPage = (id) =>
    navigate(id ? routes.makeCopyPath(id) : routes.makeAddPath());

  const goToEditPage = (id, copy) =>
    navigate(routes.makeEditPath(id, copy));
  const starBrew = (brew) => updateBrew({ ...brew, starred: !brew.starred });
  const haveBrews = allBrews.length > 0;

  return (
    <Wrapper title={haveBrews ? 'Brews' : 'Welcome!'}>
      {!haveBrews && <Welcome />}
      {haveBrews && (
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
          onStarBrew={starBrew}
        />
      )}
    </Wrapper>
  );
}
