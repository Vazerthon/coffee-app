import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  background: none;
  height: ${({ theme }) => theme.spacing.units(8)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
`;

export default function Select({
  className,
  list,
  value,
  blankValue,
  onChange,
}) {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <StyledSelect className={className} onChange={handleChange} value={value}>
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
};

Select.defaultProps = {
  className: undefined,
  blankValue: undefined,
};
