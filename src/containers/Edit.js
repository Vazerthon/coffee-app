import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

import AddBrewForm from '../components/AddBrewForm/AddBrewForm';
import { P } from '../components/Typography';
import Wrapper from './Wrapper';

export default function Edit() {
  const { id: brewId } = useParams();
  const navigate = useNavigate();
  const { allBrews, beans, methods, techniques, updateBrew } = useContext(
    BrewsContext,
  );
  const { routes } = useContext(SettingsContext);
  const navigateHome = () => navigate(routes.home);

  const brew = allBrews.find((b) => b.id === brewId);

  if (!brew) {
    return (
      <Wrapper title="Brew not found">
        <P>Sorry, no brew with id &apos;{brewId}&apos; could be found.</P>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="Update a brew">
      <AddBrewForm
        initialBrew={brew}
        save={updateBrew}
        onSave={navigateHome}
        beans={beans}
        methods={methods}
        techniques={techniques}
      />
    </Wrapper>
  );
}
