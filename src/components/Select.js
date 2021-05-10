import PropTypes from 'prop-types';

export default function Select({ list, value, blankValue, onChange }) {
  const handleChange = ({ target }) => onChange(target.value);
  
  return (
    <select onChange={handleChange} value={value} >
      { blankValue && <option value="">{blankValue}</option> }
      {list.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  blankValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  blankValue: undefined,
}