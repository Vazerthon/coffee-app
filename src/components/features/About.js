import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import DownloadLink from '../DownloadLink';
import Link from '../Link';
import { H2, H3, P } from '../Typography';
import Welcome from '../Welcome';
import { Button } from '../Buttons';

import { brewType } from '../../Types';

const Row = styled.div`
  margin: ${({ theme }) => theme.spacing.units(2)} 0;
`;

export default function About({ brews }) {
  return (
    <>
      <Welcome />
      <hr />
      <H2>Feedback</H2>
      <P>
        Coffee Chronicles is open source and freely available to use. You can
        view the source code on{' '}
        <Link href="https://github.com/Vazerthon/coffee-app">GitHub</Link>{' '}
        (issues, PRs or other contributions welcomed) or get in touch with me on{' '}
        <Link href="https://mrvallis.co.uk/">my personal website.</Link>
        I&apos;m always happy to hear feature suggestions or ideas, or just to
        know that you&apos;re finding the app useful.
      </P>
      <hr />
      <H2>Import/Export</H2>
      <Row>
        <DownloadLink
          data={{ brews }}
          filename={`coffee-chronicles-backup-${Date.now()}.json`}
          render={(onClick) => (
            <Button type="button" onClick={onClick}>
              export all data
            </Button>
          )}
        />
      </Row>
      <hr />
      <H2>Release Notes</H2>
      <H3>v1.0.0</H3>
      <ul>
        <li>Record and edit brews</li>
        <li>Filter by bean and brew method</li>
      </ul>
      <H3>v1.1.1</H3>
      <ul>
        <li>Brew timer on new brew screen</li>
        <li>Device screen stays awake while timer running</li>
      </ul>
      <H3>Coming soon...</H3>
      <ul>
        <li>Export and import data (for backup)</li>
        <li>Charts to show changes in brew data over time</li>
      </ul>
    </>
  );
}

About.propTypes = {
  brews: PropTypes.arrayOf(brewType).isRequired,
};
