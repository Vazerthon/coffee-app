import { useContext } from 'react';

import BeanNotes from '../components/features/BeanNotes';
import Wrapper from './Wrapper';

import { BrewsContext } from '../contexts/Brews';
import { BeanNotesContext } from '../contexts/BeanNotes';

export default function Beans() {
  const { beans, getBrewsOfBean } = useContext(BrewsContext);
  const { beanNotes, setBeanNote } = useContext(BeanNotesContext);

  return (
    <Wrapper title="Beans">
      <BeanNotes
        beans={beans}
        notes={beanNotes}
        setNote={setBeanNote}
        getBrewsOfBean={getBrewsOfBean}
      />
    </Wrapper>
  );
}
