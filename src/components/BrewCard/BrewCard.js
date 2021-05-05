import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { P } from '../Typography';
import {
  CoffeePot,
  Scales,
  WaterDrop,
  Thermometer,
  Timer,
  Grinder,
  Notes,
} from '../Icons';

import BoxList, { Box } from './BoxList';
import Time from './Time';
import DateLabel from './DateLabel';
import { brewType } from '../Types';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colour.tertiary};
  padding: ${({ theme }) => theme.spacing.units(4)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
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
  },
  className,
}) {
  return (
    <Container className={className}>
      <P uppercase centre>
        {bean}
        <br />
        <DateLabel>{dateTime}</DateLabel>
      </P>
      <BoxList>
        <Box centre icon={<CoffeePot role="img" />} label="method">
          {method}
        </Box>
        <Box centre icon={<Scales role="img" />} label="weight">
          {groundsWeight}g
        </Box>
        <Box centre icon={<Grinder role="img" />} label="grind size">
          {grindSize}
        </Box>
        <Box centre icon={<WaterDrop role="img" />} label="water weight">
          {waterWeight}g
        </Box>
        <Box centre icon={<Thermometer role="img" />} label="water temp">
          {waterTemperature}°
        </Box>
        <Box centre icon={<Timer role="img" />} label="time">
          <Time>{brewTime}</Time>
        </Box>
      </BoxList>
      <Box icon={<Notes role="img" />}>
        <P>{notes}</P>
      </Box>
    </Container>
  );
}

BrewCard.propTypes = {
  brew: brewType.isRequired,
  className: PropTypes.string,
};

BrewCard.defaultProps = {
  className: undefined,
};
