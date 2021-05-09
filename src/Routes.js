import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import { SettingsContext } from './contexts/Settings';

import Brews from './containers/Brews';
import Add from './containers/Add';
import Edit from './containers/Edit';
import About from './containers/About';

import Nav from './components/Nav';

const AppContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing.units(200)};
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.units(2)};
`;

function Routes() {
  const { routes } = useContext(SettingsContext);
  const {pathname } = global.window.location

  return (
    <AppContainer>
      <Nav routes={routes} currentPath={pathname} />
      <ContentContainer>
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
          <Route path={routes.about} exact>
            <About />
          </Route>
        </Switch>
      </ContentContainer>
    </AppContainer>
  );
}

export default Routes;
