import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { brewType } from '../../Types';

import { P, H2, Span } from '../Typography';
import Time from '../Time';

import {
  CoffeePot,
  Scales,
  WaterDrop,
  Thermometer,
  Timer,
  Grinder,
  Notes,
  Edit,
} from '../Icons';

import BoxList, { Box } from './BoxList';
import DateLabel from './DateLabel';
import { Button } from '../Buttons';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colour.tertiary};
  padding: ${({ theme }) => theme.spacing.units(4)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
  position: relative;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.units(4)};
  right: ${({ theme }) => theme.spacing.units(4)};
  border-radius: 50%;
  width: ${({ theme }) => theme.spacing.units(8)};
  height: ${({ theme }) => theme.spacing.units(8)};
  display: flex;
  justify-content: center;
  align-items: center;
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
  editBrew,
}) {
  return (
    <Container className={className}>
      <H2 centre capitalise>
        {bean}
        <br />
        <Span small>
          <DateLabel>{dateTime}</DateLabel>
        </Span>
      </H2>
      <EditButton onClick={editBrew}>
        <Edit role="img" aria-label="Edit brew" />
      </EditButton>
      <BoxList>
        <Box centre capitalise icon={<CoffeePot role="img" />} label="method">
          {method}
        </Box>
        <Box centre capitalise icon={<Scales role="img" />} label="weight">
          {groundsWeight}g
        </Box>
        <Box centre capitalise icon={<Grinder role="img" />} label="grind size">
          {grindSize}
        </Box>
        <Box
          centre
          capitalise
          icon={<WaterDrop role="img" />}
          label="water weight"
        >
          {waterWeight}g
        </Box>
        <Box
          centre
          capitalise
          icon={<Thermometer role="img" />}
          label="water temp"
        >
          {waterTemperature}°
        </Box>
        <Box centre capitalise icon={<Timer role="img" />} label="time">
          <Time>{brewTime}</Time>
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
};

BrewCard.defaultProps = {
  className: undefined,
};
