import { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled/macro';

import BrewCard from '../components/BrewCard/BrewCard';
import { AddButton } from '../components/Buttons';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import { H1 } from '../components/Typography';
import Welcome from '../components/Welcome';

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

export default function Brews() {
  const { brews } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const history = useHistory();
  const goToAddPage = () => history.push(routes.add);
  const toBrewCard = makeToBrewCard((id) => history.push(routes.makeEditPath(id)));

  const haveBrews = brews.length > 0;

  return (
    <>
      {haveBrews && (
        <>
          <H1>Brews</H1>
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
