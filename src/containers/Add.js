import { useContext } from 'react';
import { useHistory } from 'react-router';

import { BrewsContext } from '../contexts/Brews';
import { SettingsContext } from '../contexts/Settings';
import AddBrewForm from '../components/AddBrewForm/AddBrewForm';
import { H1 } from '../components/Typography';

export default function Add() {
  const history = useHistory();
  const {
    beans,
    methods,
    techniques,
    makeBrew,
    defaultBrew,
    addBrew,
    beanFilter,
    methodFilter,
  } = useContext(BrewsContext);
  const { routes } = useContext(SettingsContext);
  const navigateHome = () => history.push(routes.home);
  const initialBrew = makeBrew({
    ...defaultBrew,
    bean: beanFilter,
    method: methodFilter,
  });

  return (
    <>
      <H1>Add a brew</H1>
      <AddBrewForm
        initialBrew={initialBrew}
        save={addBrew}
        onSave={navigateHome}
        beans={beans}
        methods={methods}
        techniques={techniques}
      />
    </>
  );
}
