import PropTypes from 'prop-types';

export const brewType = PropTypes.shape({
  bean: PropTypes.string,
  method: PropTypes.string,
  groundsWeight: PropTypes.number,
  grindSize: PropTypes.number,
  waterWeight: PropTypes.number,
  waterTemperature: PropTypes.number,
  brewTime: PropTypes.number,
  notes: PropTypes.string,
  dateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
});
