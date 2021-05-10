import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import BrewCard from '../BrewCard/BrewCard';
import { AddButton } from '../Buttons';

import { brewType } from '../../Types';
import Select from '../Select';
import { P } from '../Typography';

const Card = styled(BrewCard)`
  margin-top: ${({ theme }) => theme.spacing.units(1)};
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

const AddBrew = styled(AddButton)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.units(2)};
  right: ${({ theme }) => theme.spacing.units(2)};
`;

const makeToBrewCard = (editBrew) => (brew) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Card key={brew.id} brew={brew} editBrew={() => editBrew(brew.id)} />
);

export default function Brews({
  brews,
  beans,
  methods,
  beanFilter,
  setBeanFilter,
  methodFilter,
  setMethodFilter,
  goToAddPage,
  goToEditPage,
}) {
  const toBrewCard = makeToBrewCard(goToEditPage);
  const haveBrews = brews.length > 0;

  return (
    <>
      <Select
        list={beans}
        value={beanFilter}
        onChange={setBeanFilter}
        blankValue="Filter by bean..."
      />
      <Select
        list={methods}
        value={methodFilter}
        onChange={setMethodFilter}
        blankValue="Filter by method..."
      />
      {haveBrews && brews.map(toBrewCard)}
      {!haveBrews && (
        <P>
          No brews match your chosen filters
        </P>
      )}
      <AddBrew role="button" onClick={goToAddPage} />
    </>
  );
}

Brews.propTypes = {
  brews: PropTypes.arrayOf(brewType).isRequired,
  goToAddPage: PropTypes.func.isRequired,
  goToEditPage: PropTypes.func.isRequired,
  beans: PropTypes.arrayOf(PropTypes.string),
  methods: PropTypes.arrayOf(PropTypes.string),
  beanFilter: PropTypes.string.isRequired,
  setBeanFilter: PropTypes.func.isRequired,
  methodFilter: PropTypes.string.isRequired,
  setMethodFilter: PropTypes.func.isRequired,
};

Brews.defaultProps = {
  beans: [],
  methods: [],
};
