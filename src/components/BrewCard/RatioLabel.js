import PropTypes from 'prop-types';

const { round } = Math;

export default function RatioLabel({ grounds, water }) {
  return `${round(grounds * 1000 / water)}g/litre`;
}

RatioLabel.propTypes = {
  grounds: PropTypes.number.isRequired,
  water: PropTypes.number.isRequired,
};
