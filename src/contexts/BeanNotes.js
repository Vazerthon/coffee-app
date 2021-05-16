import { createContext } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from '../hooks/usePersistedState';

export const BeanNotesContext = createContext();

export const BeanNotesProvider = ({ children }) => {
  const [storedBeanNotes, setStoredBeanNotes] = usePersistedState('beanNotes', {});

  const setBeanNote = (bean, note) => setStoredBeanNotes({ ...storedBeanNotes, [bean]: note });

  const overwriteAllNotes = (notes) => setStoredBeanNotes(notes);

  const value = {
    beanNotes: storedBeanNotes,
    setBeanNote,
    overwriteAllNotes,
  };

  return (
    <BeanNotesContext.Provider value={value}>{children}</BeanNotesContext.Provider>
  );
};

BeanNotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
