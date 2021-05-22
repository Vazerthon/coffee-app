import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import BeanCard from '../BeanCard/BeanCard';
import { H2, P } from '../Typography';

const Card = styled(BeanCard)`
  margin-top: ${({ theme }) => theme.spacing.units(1)};
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

export default function BeanNotes({ beans, notes, setNote, getBrewsOfBean }) {
  const haveBeans = beans.length > 0;

  return (
    <>
      {haveBeans &&
        beans.map((bean) => (
          <Card
            key={bean}
            bean={bean}
            note={notes[bean]}
            onChange={setNote}
            brewsOfThisBean={getBrewsOfBean(bean)}
          />
        ))}
      {!haveBeans && (
        <>
          <H2>Nothing here yet!</H2>
          <P>
            Once you&apos;ve brewed a coffee and recorded it in the app
            you&apos;ll be able to add notes for each bean you brew with here.
            Get started by brewing up some coffee!
          </P>
        </>
      )}
    </>
  );
}

BeanNotes.propTypes = {
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
  notes: PropTypes.objectOf(PropTypes.string).isRequired,
  setNote: PropTypes.func.isRequired,
  getBrewsOfBean: PropTypes.func.isRequired,
};
