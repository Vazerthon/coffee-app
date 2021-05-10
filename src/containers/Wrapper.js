import { useContext } from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { SettingsContext } from '../contexts/Settings';

import Nav from '../components/Nav';

const AppContainer = styled.div`
  max-width: ${({ theme }) => theme.spacing.units(200)};
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.units(2)};
`;

export default function Wrapper({ title, children }) {
  const { routes } = useContext(SettingsContext);
  const {pathname } = global.window.location

  return (
    <AppContainer>
      <Nav routes={routes} currentPath={pathname} title={title} />
      <ContentContainer>
        {children}
      </ContentContainer>
    </AppContainer>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
