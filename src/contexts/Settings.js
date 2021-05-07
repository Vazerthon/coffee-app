import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const settings = {
  routes: {
    home: '/',
    add: '/add',
    edit: '/edit/:id',
    makeEditPath: (id) => `/edit/${id}`,
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
