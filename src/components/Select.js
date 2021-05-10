import PropTypes from 'prop-types';

export default function Select({
  className,
  list,
  value,
  blankValue,
  onChange,
}) {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <select className={className} onChange={handleChange} value={value}>
      {blankValue && <option value="">{blankValue}</option>}
      {list.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  blankValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  className: undefined,
  blankValue: undefined,
};