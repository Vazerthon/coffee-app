import PropTypes from 'prop-types';

export default function NumberFormat({ children }) {
  return new Intl.NumberFormat('en-GB').format(children);
}

NumberFormat.propTypes = {
  children: PropTypes.number.isRequired,
};
