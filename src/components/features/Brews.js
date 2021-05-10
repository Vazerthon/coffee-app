import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import BrewCard from '../BrewCard/BrewCard';
import { AddButton } from '../Buttons';

import { H1 } from '../Typography';
import Welcome from '../Welcome';
import { brewType } from '../../Types';
import Select from '../Select';

const Card = styled(BrewCard)`
  margin-top: ${({ theme }) => theme.spacing.units(1)};
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

const AddBrew = styled(AddButton)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.units(2)};
  right: ${({ theme }) => theme.spacing.units(2)};
`;

const Title = styled(H1)`
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
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
      {haveBrews && (
        <>
          <Row>
            <Title>Brews</Title>
            <div>
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
            </div>
          </Row>
          {brews.map(toBrewCard)}
        </>
      )}
      {!haveBrews && (
        <>
          <H1>Welcome!</H1>
          <Welcome />
        </>
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
