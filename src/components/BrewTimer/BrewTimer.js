import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import useTick from '../../hooks/useTick';
import { IconButton } from '../Buttons';
import { Stop, Play } from '../Icons';
import Time from '../Time';

const ButtonRow = styled.div`
  display: flex;
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

export default function BrewTimer({ className }) {
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
    setStatus('stopped');
  };

  return (
    <div className={className}>
      <Time>{secondsSinceStart}</Time>
      <ButtonRow>
        {timerNotRunning && (
          <IconButton
            icon={Play}
            ariaLabel="Start timer"
            onClick={startTimer}
          />
        )}
        {timerRunning && (
          <IconButton
            icon={Stop}
            ariaLabel="Stop timer"
            onClick={stopTimer}
          />
        )}
      </ButtonRow>
    </div>
  );
}

BrewTimer.propTypes = {
  className: PropTypes.string,
};

BrewTimer.defaultProps = {
  className: undefined,
};
