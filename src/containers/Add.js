import { useContext } from 'react';
import { useHistory } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import AddBrewForm from '../components/AddBrewForm';
import { H1 } from '../components/Typography';

export default function Add() {
  const history = useHistory();
  const { beans, methods, makeBrew, addBrew } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const navigateHome = () => history.push(routes.home);

  return (
    <>
      <H1>Add a brew</H1>
      <AddBrewForm
        defaultBrew={makeBrew()}
        addBrew={addBrew}
        onAddBrew={navigateHome}
        beans={beans}
        methods={methods}
      />
    </>
  );
}
