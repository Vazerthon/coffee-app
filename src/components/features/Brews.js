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

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dropdown = styled(Select)`
  margin-bottom: ${({ theme }) => theme.spacing.units(2)};
`;

// eslint-disable-next-line func-names
const makeToBrewCard = (editBrew, starBrew, copyBrew) => function(brew) {
  const { id } = brew;
  return <Card
    key={brew.id} // eslint-disable-line react/destructuring-assignment
    brew={brew}
    editBrew={() => editBrew(id)}
    copyBrew={() => copyBrew(id)}
    onStarBrew={() => starBrew(brew)}
  />
};

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
  onStarBrew,
}) {
  const toBrewCard = makeToBrewCard(goToEditPage, onStarBrew, goToAddPage);
  const haveBrews = brews.length > 0;

  return (
    <>
      <Column>
        <Dropdown
          list={beans}
          value={beanFilter}
          onChange={setBeanFilter}
          blankValue="Filter by bean..."
          label="Filter by bean"
        />
        <Dropdown
          list={methods}
          value={methodFilter}
          onChange={setMethodFilter}
          blankValue="Filter by method..."
          label="Filter by method"
        />
      </Column>
      {haveBrews && brews.map(toBrewCard)}
      {!haveBrews && (
        <P>
          Looks like you&apos;ve never made a {methodFilter} brew with{' '}
          {beanFilter} beans
        </P>
      )}
      <AddBrew role="button" onClick={() => goToAddPage()} />
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
  onStarBrew: PropTypes.func.isRequired,
};

Brews.defaultProps = {
  beans: [],
  methods: [],
};
