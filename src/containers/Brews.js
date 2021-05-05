import { useContext } from 'react';
import {useHistory} from 'react-router';
import styled from '@emotion/styled/macro';

import BrewCard from '../components/BrewCard/BrewCard';
import AddButton from '../components/AddButton';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

const Card = styled(BrewCard)`
  margin-top: ${({ theme }) => theme.spacing.units(1)};
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

const AddBrew = styled(AddButton)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.units(2)};
  right: ${({ theme }) => theme.spacing.units(2)};
`;

const toBrewCard = (brew) => (
  <Card key={brew.id} brew={brew} />
)

export default function Brews() {
  const { brews } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const history = useHistory();
  const goToAddPage = () => history.push(routes.add);

  return (
    <>
      {brews.map(toBrewCard)}
      <AddBrew role="button" onClick={goToAddPage} />
    </>
  )
}
