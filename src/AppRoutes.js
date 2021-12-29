import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { SettingsContext } from './contexts/Settings';

import Brews from './containers/Brews';
import Add from './containers/Add';
import Edit from './containers/Edit';
import Beans from './containers/Beans';
import About from './containers/About';

function AppRoutes() {
  const { routes } = useContext(SettingsContext);

  return (
    <Routes>
      <Route path={routes.home} exact element={<Brews />} />
      <Route path={routes.add} exact element={<Add />} />
      <Route path={routes.copy} exact element={<Add />} />
      <Route path={routes.edit} exact element={<Edit />} />
      <Route path={routes.beans} exact element={<Beans />} />
      <Route path={routes.about} exact element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
