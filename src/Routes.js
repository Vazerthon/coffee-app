import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { SettingsContext } from './contexts/Settings';

import Brews from './containers/Brews';
import Add from './containers/Add';

function Routes() {
  const { routes } = useContext(SettingsContext);

  return (
    <Switch>
      <Route path={routes.home} exact>
        <Brews />
      </Route>
      <Route path={routes.add} exact>
        <Add />
      </Route>
    </Switch>
  );
}

export default Routes;
