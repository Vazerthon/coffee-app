import Link from '../components/Link';
import { H2, P } from '../components/Typography';
import Welcome from '../components/Welcome';
import Wrapper from './Wrapper';

export default function About() {
  return (
    <Wrapper title="About">
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
      <H2>Version</H2>
      <P>
        v0.1.0
        <br />
        Still in early development, expect a few rough edges
      </P>
    </Wrapper>
  );
}
