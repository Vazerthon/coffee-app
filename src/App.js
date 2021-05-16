import { BrowserRouter } from 'react-router-dom';

import Theme from './contexts/Theme';
import Routes from './Routes';
import { SettingsProvider } from './contexts/Settings';
import { BrewsProvider } from './contexts/Brews';
import { BeanNotesProvider } from './contexts/BeanNotes';

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <BrewsProvider>
          <BeanNotesProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </BeanNotesProvider>
        </BrewsProvider>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
