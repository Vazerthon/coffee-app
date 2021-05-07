import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { Span } from '../Typography';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.units(3)};
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.spacing.units(4)};
  font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  height: ${({ theme }) => theme.spacing.units(6)};
  color: ${({ theme }) => theme.colour.primary};
  width: 100%;
`;

const IconLabel = styled(Span)`
  display: flex;
`;

const IconWrapper = styled(Span)`
  margin-left: ${({ theme }) => theme.spacing.units(2)};
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export default function LabelledInput({
  label,
  value,
  onChange,
  type,
  icon,
  list,
  min,
  max,
  display,
}) {
  const handleChange = (e) => onChange(e.currentTarget.value);
  return (
    <Label>
      <IconLabel>
        {label}
        <IconWrapper>{icon}</IconWrapper>
      </IconLabel>
      <Row>
        <Input
          type={type}
          value={value}
          onChange={handleChange}
          list={list ? label : undefined}
          min={min}
          max={max}
        />
        {display}
      </Row>
      {list && (
        <datalist id={label}>
          {list.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </datalist>
      )}
    </Label>
  );
}

LabelledInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
  min: PropTypes.number,
  max: PropTypes.number,
  display: PropTypes.node,
};

LabelledInput.defaultProps = {
  list: undefined,
  min: undefined,
  max: undefined,
  display: undefined,
};
