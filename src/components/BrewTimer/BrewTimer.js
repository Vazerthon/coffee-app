import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconButton } from '../Buttons';
import { Pause, Play, Reset } from '../Icons';
import Time from '../Time';

const ButtonRow = styled.div`
  display: flex;
`;

export default function BrewTimer({ className }) {
  // eslint-disable-next-line no-unused-vars
  const [startDateTime, setStartDateTime] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [secondsSinceStart, setSecondsSinceStart] = useState(0);
  const [timerId, setTimerId] = useState(undefined);

  const startTick = () => {
    const id = setInterval(() => {
      if (!startDateTime) {
        return;
      }
      const diffInSeconds = Math.floor((new Date().getTime() - startDateTime.getTime()) / 1000);
      setSecondsSinceStart(diffInSeconds);
    }, 250);

    setTimerId(id);
  };
  
  const setStartDateTimeToNow = () => setStartDateTime(new Date());
  
  const startTimer = () => {
    setStartDateTimeToNow();
    startTick();
  };

  const pauseTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setSecondsSinceStart(0);
    setStartDateTime(undefined);
  };

  return (
    <div className={className}>
      <Time>{secondsSinceStart}</Time>
      <ButtonRow>
        <IconButton icon={Play} ariaLabel="Start timer" onClick={startTimer} />
        <IconButton icon={Pause} ariaLabel="Pause timer" onClick={pauseTimer} />
        <IconButton icon={Reset} ariaLabel="Reset timer" onClick={resetTimer} />
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
