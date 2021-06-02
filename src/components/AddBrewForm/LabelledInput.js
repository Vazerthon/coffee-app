import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { Span } from '../Typography';
import DataList from '../DataList';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.units(3)};
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
  Component,
}) {
  const handleChange = (e) => onChange(e.currentTarget.value);
  return (
    <Label>
      <IconLabel>
        {label}
        <IconWrapper>{icon}</IconWrapper>
      </IconLabel>
      <Row>
        <Component
          type={type}
          value={value}
          onChange={handleChange}
          list={list ? label : undefined}
          min={min}
          max={max}
        />
        {display}
      </Row>
      {list && <DataList id={label} list={list} />}
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
  // eslint-disable-next-line react/forbid-prop-types
  Component: PropTypes.object.isRequired,
};

LabelledInput.defaultProps = {
  list: undefined,
  min: undefined,
  max: undefined,
  display: undefined,
};
