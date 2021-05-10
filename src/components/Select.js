import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  background: none;
  height: ${({ theme }) => theme.spacing.units(8)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
  text-transform: capitalize;
`;

export default function Select({
  className,
  list,
  value,
  blankValue,
  onChange,
  label,
}) {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <StyledSelect className={className} onChange={handleChange} value={value} aria-label={label}>
      {blankValue && <option value="">{blankValue}</option>}
      {list.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  blankValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

Select.defaultProps = {
  className: undefined,
  blankValue: undefined,
};
