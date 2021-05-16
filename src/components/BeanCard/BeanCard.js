import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { H2 } from '../Typography';
import { Beans } from '../Icons';
import { brewType } from '../../Types';
import NumberFormat from '../NumberFormat';

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

const Textarea = styled.textarea`
  width: calc(100% - ${({ theme }) => theme.spacing.units(5)});
  padding: ${({ theme }) => theme.spacing.units(2)};
  min-height: ${({ theme }) => theme.spacing.units(20)};
  color: ${({ theme }) => theme.colour.primary};
`;

export default function BeanCard({
  className,
  bean,
  note,
  allBrews,
  onChange,
}) {
  const handleChange = ({ target }) => onChange(bean, target.value);
  const brewsOfThisBean = allBrews.filter((brew) => brew.bean === bean);
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
  allBrews: PropTypes.arrayOf(brewType).isRequired,
};

BeanCard.defaultProps = {
  className: undefined,
  note: undefined,
};
