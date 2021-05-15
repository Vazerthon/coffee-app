import { useContext } from 'react';

import BeansFeature from '../components/features/Beans';
import Wrapper from './Wrapper';

import { BrewsContext } from '../contexts/Brews';

export default function Beans() {
  const { beans } = useContext(BrewsContext);

  return (
    <Wrapper title="Beans">
      <BeansFeature beans={beans} />
    </Wrapper>
  );
}
