import { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';

import AddBrewForm from '../components/AddBrewForm/AddBrewForm';
import { H1 } from '../components/Typography';

export default function Edit({ brewId }) {
  const history = useHistory();
  const { brews, beans, methods, techniques, updateBrew } = useContext(
    BrewsContext,
  );
  const { routes } = useContext(SettingsContext);
  const navigateHome = () => history.push(routes.home);

  const brew = brews.find((b) => b.id === brewId);

  if (!brew) {
    return <>no brew</>;
  }

  return (
    <>
      <H1>Update brew</H1>
      <AddBrewForm
        initialBrew={brew}
        save={updateBrew}
        onSave={navigateHome}
        beans={beans}
        methods={methods}
        techniques={techniques}
      />
    </>
  );
}

Edit.propTypes = {
  brewId: PropTypes.string.isRequired,
};
