import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const brewType = PropTypes.shape({
  bean: PropTypes.string,
  method: PropTypes.string,
  groundsWeight: PropTypes.number,
  grindSize: PropTypes.number,
  waterWeight: PropTypes.number,
  waterTemperature: PropTypes.number,
  brewTime: PropTypes.number,
  notes: PropTypes.string,
  dateTime: PropTypes.instanceOf(Date),
});
