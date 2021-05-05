import { useContext } from 'react';
import { useHistory } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import AddBrewForm from '../components/AddBrewForm';

export default function Add() {
  const history = useHistory();
  const { beans, methods, makeBrew, addBrew } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const navigateHome = () => history.push(routes.home);

  return (
    <AddBrewForm
      defaultBrew={makeBrew()}
      addBrew={addBrew}
      onAddBrew={navigateHome}
      beans={beans}
      methods={methods}
    />
  );
}
