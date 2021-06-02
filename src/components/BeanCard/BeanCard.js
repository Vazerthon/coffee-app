import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { H2 } from '../Typography';
import { Beans } from '../Icons';
import { brewType } from '../../Types';
import NumberFormat from '../NumberFormat';
import { Textarea } from '../FormControls';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colour.tertiary};
  padding: ${({ theme }) => theme.spacing.units(2)};
  border-radius: ${({ theme }) => theme.spacing.units(1)};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
  background-color: ${({ theme }) => theme.colour.secondary};
`;

const Title = styled(H2)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & :first-of-type {
    margin-right: ${({ theme }) => theme.spacing.units(2)};
  }
`;

const List = styled.ul`
  margin: ${({ theme }) => theme.spacing.units(2)} 0;
`;

export default function BeanCard({
  className,
  bean,
  note,
  brewsOfThisBean,
  onChange,
}) {
  const handleChange = ({ target }) => onChange(bean, target.value);
  const brewCount = brewsOfThisBean.length;
  const totalWeight = brewsOfThisBean
    .map(({ groundsWeight }) => groundsWeight)
    .reduce((p, c) => p + c, 0);

  return (
    <Container className={className}>
      <Title centre capitalise>
        <Beans /> {bean}
      </Title>
      <List>
        <li>Brews: {brewCount}</li>
        <li>Weight: <NumberFormat>{totalWeight}</NumberFormat>g</li>
      </List>
      <Textarea
        value={note}
        placeholder={`Add some notes about ${bean}`}
        onChange={handleChange}
      />
    </Container>
  );
}

BeanCard.propTypes = {
  bean: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  note: PropTypes.string,
  className: PropTypes.string,
  brewsOfThisBean: PropTypes.arrayOf(brewType).isRequired,
};

BeanCard.defaultProps = {
  className: undefined,
  note: undefined,
};
