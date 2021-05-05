import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { PlusCircle } from './Icons';

const BigPlusCircle = styled(PlusCircle)`
  font-size: ${({ theme }) => theme.spacing.units(12)};
  border: 1px solid ${({ theme }) => theme.colour.primary};
  border-radius: 50%;
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colour.tertiary};
  background: none;
  border: none;
`;

export default function AddButton({ className, onClick }) {
  return (
    <Button className={className} onClick={onClick}>
      <BigPlusCircle />
    </Button>
  )
}

AddButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

AddButton.defaultProps = {
  className: undefined,
};
