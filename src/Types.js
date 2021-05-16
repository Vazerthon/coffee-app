import PropTypes from 'prop-types';

export const routesType = PropTypes.shape({
  home: PropTypes.string,
  add: PropTypes.string,
  about: PropTypes.string,
})

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
  technique: PropTypes.string,
  taste: PropTypes.number,
});

export const backupDataType = PropTypes.shape({
  brews: PropTypes.arrayOf(brewType),
});