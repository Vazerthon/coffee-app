import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { BrewsContext } from '../contexts/Brews';
import { BeanNotesContext } from '../contexts/BeanNotes';

const useImportExport = () => {
  const navigate = useNavigate();
  const { routes } = useContext(SettingsContext);
  const { allBrews, overwriteAllBrews } = useContext(BrewsContext);
  const { beanNotes, overwriteAllNotes } = useContext(BeanNotesContext);

  const importData = (rawFileData) => {
    try {
      const json = JSON.parse(rawFileData);

      if (json.brews) {
        overwriteAllBrews(json.brews);
      }

      if (json.beanNotes) {
        overwriteAllNotes(json.beanNotes);
      }

      navigate(routes.home);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const generateExportData = () => ({
    brews: allBrews,
    beanNotes,
  });

  return {
    importData,
    generateExportData,
  };
};

export default useImportExport;
