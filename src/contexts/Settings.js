import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const settings = {
  routes: {
    home: '/',
    about: '/about',
    add: '/add',
    copy: '/add/:id',
    edit: '/edit/:id',
    beans: '/beans',
    makeEditPath: (id) => `/edit/${id}`,
    makeAddPath: () => '/add',
    makeCopyPath: (id) => `/add/${id}`,
  },
};

export function SettingsProvider({ children }) {
  return <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
