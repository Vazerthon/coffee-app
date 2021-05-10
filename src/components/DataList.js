import PropTypes from 'prop-types';

export default function DataList({ list, id }) {
  return (
    <datalist id={id}>
      {list.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </datalist>
  );
}

DataList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
