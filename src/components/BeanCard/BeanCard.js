import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';

import { H2 } from '../Typography';
import { Beans } from '../Icons';

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

const Textarea = styled.textarea`
  width: calc(100% - ${({ theme }) => theme.spacing.units(5)});
  padding: ${({ theme }) => theme.spacing.units(2)};
  margin-top: ${({ theme }) => theme.spacing.units(2)};
  min-height: ${({ theme }) => theme.spacing.units(20)};
  color: ${({ theme }) => theme.colour.primary};
`;

export default function BeanCard({ className, bean, note, onChange }) {
  const handleChange = ({ target }) => onChange(bean, target.value);
  return (
    <Container className={className}>
      <Title centre capitalise>
        <Beans /> {bean}
      </Title>
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
};

BeanCard.defaultProps = {
  className: undefined,
  note: undefined,
};
