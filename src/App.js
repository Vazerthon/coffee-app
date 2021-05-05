import { BrowserRouter } from 'react-router-dom';

import Theme from './contexts/Theme';
import Routes from './Routes';
import { SettingsProvider } from './contexts/Settings';
import { BrewsProvider } from './contexts/Brews';

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <BrewsProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </BrewsProvider>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
