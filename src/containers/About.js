import { useContext } from 'react';

import AboutFeature from '../components/features/About';
import Wrapper from './Wrapper';

import { BrewsContext } from '../contexts/Brews';

export default function About() {
  const { allBrews } = useContext(BrewsContext);

  return (
    <Wrapper title="About">
      <AboutFeature brews={allBrews} />
    </Wrapper>
  );
}
