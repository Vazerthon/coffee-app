import { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import AddBrewForm from '../components/AddBrewForm/AddBrewForm';
import Wrapper from './Wrapper';

export default function Add({ brewId }) {
  const history = useHistory();
  const {
    beans,
    methods,
    makeBrew,
    defaultBrew,
    addBrew,
    beanFilter,
    methodFilter,
  } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const { allBrews } = useContext(BrewsContext)

  const navigateHome = () => history.push(routes.home);

  const baseBrew = brewId ? allBrews.find(({ id }) => id === brewId) : defaultBrew || defaultBrew;

  const initialBrew = makeBrew({
    ...baseBrew,
    bean: beanFilter || baseBrew.bean,
    method: methodFilter || baseBrew.method,
    dateTime: new Date(),
  });

  return (
    <Wrapper title="Add a brew">
      <AddBrewForm
        showTimer
        initialBrew={initialBrew}
        save={addBrew}
        onSave={navigateHome}
        beans={beans}
        methods={methods}
      />
    </Wrapper>
  );
}

Add.propTypes = {
  brewId: PropTypes.string,
};

Add.defaultProps = {
  brewId: undefined,
};
