import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import useTick from '../../hooks/useTick';
import { IconButton } from '../Buttons';
import { Stop, Play } from '../Icons';
import Time from '../Time';
import { Span } from '../Typography';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeLabel = styled(Span)`
  font-size: ${({ theme }) => theme.spacing.units(16)};
  margin-right: ${({ theme }) => theme.spacing.units(4)};
`;

const reducer = (state, { type, payload }) =>
  ({
    setStartTimestamp: () => ({ ...state, startTimestamp: payload }),
    setTime: () => ({ ...state, secondsSinceStart: payload }),
    setStatus: () => ({ ...state, timerStatus: payload }),
  }[type]());

const initialState = {
  secondsSinceStart: 0,
  timerStatus: 'stopped',
  startTimestamp: undefined,
};

export default function BrewTimer({ onStop }) {
  const frequency = 200;
  const [{ secondsSinceStart, timerStatus, startTimestamp }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const timerNotRunning = timerStatus === 'stopped';
  const timerRunning = timerStatus === 'running';

  const setStartTimestamp = (timestamp) =>
    dispatch({ type: 'setStartTimestamp', payload: timestamp });
  const setTime = (time) => dispatch({ type: 'setTime', payload: time });
  const setStatus = (status) =>
    dispatch({ type: 'setStatus', payload: status });

  const onTick = () => setTime(Math.round((Date.now() - startTimestamp) / 1000));
  const { startTick, stopTick } = useTick({ frequency, onTick });

  useEffect(() => {
    if (timerRunning) {
      startTick();
    }
    if (timerNotRunning) {
      stopTick();
    }
  }, [timerRunning, timerNotRunning, startTick, stopTick, timerStatus]);

  const startTimer = () => {
    setStartTimestamp(Date.now());
    setStatus('running');
  };

  const stopTimer = () => {
    onStop(secondsSinceStart);
    setStatus('stopped');
  };

  return (
      <Row>
        <TimeLabel>
          <Time>{secondsSinceStart}</Time>
        </TimeLabel>
        {timerNotRunning && (
          <IconButton
            large
            icon={Play}
            ariaLabel="Start timer"
            onClick={startTimer}
          />
        )}
        {timerRunning && (
          <IconButton
            large
            icon={Stop}
            ariaLabel="Stop timer"
            onClick={stopTimer}
          />
        )}
      </Row>
  );
}

BrewTimer.propTypes = {
  onStop: PropTypes.func,
};

BrewTimer.defaultProps = {
  onStop: () => {},
};
