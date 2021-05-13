import { useContext } from 'react';
import { useHistory } from 'react-router';

import AboutFeature from '../components/features/About';
import Wrapper from './Wrapper';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

export default function About() {
  const { allBrews, overwriteAllBrews } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const history = useHistory();

  const onImportBrews = (data) => {
    overwriteAllBrews(data);
    history.push(routes.home);
  }

  return (
    <Wrapper title="About">
      <AboutFeature brews={allBrews} onImportBrews={onImportBrews} />
    </Wrapper>
  );
}
