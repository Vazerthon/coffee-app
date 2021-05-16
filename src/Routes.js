import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { SettingsContext } from './contexts/Settings';

import Brews from './containers/Brews';
import Add from './containers/Add';
import Edit from './containers/Edit';
import Beans from './containers/Beans';
import About from './containers/About';

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
      <Route path={routes.edit} exact>
        {({ match }) => <Edit brewId={match.params.id} />}
      </Route>
      <Route path={routes.beans} exact>
        <Beans />
      </Route>
      <Route path={routes.about} exact>
        <About />
      </Route>
    </Switch>
  );
}

export default Routes;
