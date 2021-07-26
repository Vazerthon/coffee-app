import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { brewType } from '../../Types';

import { P, H2, Span } from '../Typography';
import Time from '../Time';
import { IconButton } from '../Buttons';
import TasteLabel from '../TasteLabel';
import {
  CoffeePot,
  Scales,
  Thermometer,
  Timer,
  Grinder,
  Notes,
  Edit,
  Taste,
  Star,
  Clone,
} from '../Icons';

import BoxList, { Box } from './BoxList';
import DateLabel from './DateLabel';
import RatioLabel from './RatioLabel';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colour.tertiary};
  padding: ${({ theme }) => theme.spacing.units(2)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
  background-color: ${({ theme }) => theme.colour.secondary};
  ${({ invert, theme }) => invert && `
    background-color: ${theme.colour.primary};
    color: ${theme.colour.secondary};
  `};
`;

const Row = styled.div`
  display: flex;
`;

const Title = styled(H2)`
  width: 100%;
  margin: 0 ${({ theme }) => theme.spacing.units(2)};
`;

const MarginButton = styled(IconButton)`
  margin: 0 ${({ theme }) => theme.spacing.units(1)};
`;

export default function BrewCard({
  brew: {
    bean,
    method,
    groundsWeight,
    grindSize,
    waterWeight,
    waterTemperature,
    brewTime,
    notes,
    dateTime,
    taste,
    starred,
  },
  className,
  editBrew,
  onStarBrew,
  copyBrew,
}) {
  return (
    <Container className={className} invert={starred}>
      <Row>
        <MarginButton onClick={onStarBrew} icon={Star} ariaLabel="Star" />
        <Title centre capitalise>
          {bean}
          <br />
          <Span small>
            <DateLabel>{dateTime}</DateLabel>
          </Span>
        </Title>
        <MarginButton onClick={editBrew} icon={Edit} ariaLabel="Edit" />
        <MarginButton onClick={copyBrew} icon={Clone} ariaLabel="Clone" />
      </Row>
      <BoxList>
        <Box centre capitalise icon={<CoffeePot role="img" />} label="method">
          {method}
        </Box>
        <Box centre capitalise icon={<Scales role="img" />}>
          <>
            <Span>
              {groundsWeight}g / {waterWeight}g
            </Span>
            <br />
            <Span small uppercase>
              <RatioLabel grounds={groundsWeight} water={waterWeight} />
            </Span>
          </>
        </Box>
        <Box centre capitalise icon={<Grinder role="img" />} label="grind">
          {grindSize}
        </Box>
        <Box centre capitalise icon={<Thermometer role="img" />} label="temp">
          {waterTemperature}°
        </Box>
        <Box centre capitalise icon={<Timer role="img" />} label="time">
          <Time>{brewTime}</Time>
        </Box>
        <Box centre capitalise icon={<Taste role="img" />} label="taste">
          <TasteLabel>{taste}</TasteLabel>
        </Box>
      </BoxList>
      {notes && (
        <Box icon={<Notes role="img" />}>
          <P>{notes}</P>
        </Box>
      )}
    </Container>
  );
}

BrewCard.propTypes = {
  brew: brewType.isRequired,
  className: PropTypes.string,
  editBrew: PropTypes.func.isRequired,
  onStarBrew: PropTypes.func.isRequired,
  copyBrew: PropTypes.func.isRequired,
};

BrewCard.defaultProps = {
  className: undefined,
};
