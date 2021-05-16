import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import BeanCard from '../BeanCard/BeanCard';

const Card = styled(BeanCard)`
  margin-top: ${({ theme }) => theme.spacing.units(1)};
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

export default function BeanNotes({ beans, notes, setNote }) {
  return (
    <>
      {beans.map((bean) => (
        <Card key={bean} bean={bean} note={notes[bean]} onChange={setNote} />
      ))}
    </>
  );
}

BeanNotes.propTypes = {
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
  notes: PropTypes.objectOf(PropTypes.string).isRequired,
  setNote: PropTypes.func.isRequired,
};
