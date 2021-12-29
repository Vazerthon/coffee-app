import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from '../hooks/usePersistedState';

export const BeanNotesContext = createContext();

export function BeanNotesProvider({ children }) {
  const [storedBeanNotes, setStoredBeanNotes] = usePersistedState('beanNotes', {});

  const value = useMemo(() => {
    const setBeanNote = (bean, note) => setStoredBeanNotes({ ...storedBeanNotes, [bean]: note });

    const overwriteAllNotes = (notes) => setStoredBeanNotes(notes);

    return {
      beanNotes: storedBeanNotes,
      setBeanNote,
      overwriteAllNotes,
    }
  }, [setStoredBeanNotes, storedBeanNotes]);

  return (
    <BeanNotesContext.Provider value={value}>{children}</BeanNotesContext.Provider>
  );
}

BeanNotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
