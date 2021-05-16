import { useContext } from 'react';
import { useHistory } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { BrewsContext } from '../contexts/Brews';

const useImportExport = () => {
  const history = useHistory();
  const { routes } = useContext(SettingsContext);
  const { allBrews, overwriteAllBrews } = useContext(BrewsContext);

  const importData = (rawFileData) => {
    try {
      const { brews } = JSON.parse(rawFileData);

      if (brews) {
        overwriteAllBrews(brews);
      }

      history.push(routes.home);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const generateExportData = () => ({
    brews: allBrews,
  });

  return {
    importData,
    generateExportData,
  };
};

export default useImportExport;
