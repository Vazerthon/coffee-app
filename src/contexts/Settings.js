import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const settings = {
  routes: {
    home: '/',
    about: '/about',
    add: '/add/:id?',
    edit: '/edit/:id',
    beans: '/beans',
    makeEditPath: (id) => `/edit/${id}`,
    makeAddPath: () => '/add',
    makeCopyPath: (id) => `/add/${id}`,
  },
};

export const SettingsProvider = ({ children }) => (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
