import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import Theme from './contexts/Theme';
import Routes from './Routes';
import { SettingsProvider } from './contexts/Settings';
import { BrewsProvider } from './contexts/Brews';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.units(2)};
`;

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <BrewsProvider>
          <BrowserRouter>
            <Container>
              <Routes />
            </Container>
          </BrowserRouter>
        </BrewsProvider>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
