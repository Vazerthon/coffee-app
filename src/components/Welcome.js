import styled from '@emotion/styled';
import { Beans } from './Icons';
import { P } from './Typography';

const MassiveBeans = styled(Beans)`
  font-size: ${({ theme }) => theme.spacing.units(30)};
  margin: 0 auto;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.units(4)};
`;

export default function Welcome() {
  return (
    <>
      <MassiveBeans />
      <P>
        Welcome to Coffee Chronicles, your coffee brewing diary and logbook that
        will help you to dial in the perfect cup and remember variables between
        different brew methods and beans.
      </P>
      <P>
        To get started, brew some coffee and record it here. With each brew,
        record weight, temperature and other variables. Over time you&apos;ll
        build a picture of the settings that work best for you.
      </P>
      <P>Happy brewing!</P>
    </>
  );
}
