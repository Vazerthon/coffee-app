import PropTypes from 'prop-types';

const minimumTwoDigits = (number) => `${number}`.padStart(2, '0');

export default function Time({ children }) {
  const minutes = Math.floor(children / 60);
  const seconds = children % 60;
  return (
    <>
      {minimumTwoDigits(minutes)}:{minimumTwoDigits(seconds)}
    </>
  );
}

Time.propTypes = {
  children: PropTypes.number.isRequired,
};
