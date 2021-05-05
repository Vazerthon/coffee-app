import { useContext } from 'react';
import {useHistory} from 'react-router';
import styled from '@emotion/styled/macro';

import BrewCard from '../components/BrewCard/BrewCard';
import { AddButton } from '../components/Buttons';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import { H1 } from '../components/Typography';

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
      <H1>Brews</H1>
      {brews.map(toBrewCard)}
      <AddBrew role="button" onClick={goToAddPage} />
    </>
  )
}
