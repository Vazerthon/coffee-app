import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { PlusCircle } from './Icons';

const BigPlusCircle = styled(PlusCircle)`
  font-size: ${({ theme }) => theme.spacing.units(12)};
  border: 1px solid ${({ theme }) => theme.colour.primary};
  border-radius: 50%;
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
`;

const AddButtonBase = styled.button`
  color: ${({ theme }) => theme.colour.tertiary};
  background: none;
  border: none;
`;

export function AddButton({ className, onClick }) {
  return (
    <AddButtonBase className={className} onClick={onClick}>
      <BigPlusCircle />
    </AddButtonBase>
  )
}

AddButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

AddButton.defaultProps = {
  className: undefined,
};

export const Button = styled.button`
  height: ${({ theme }) => theme.spacing.units(8)};
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.colour.tertiary};
  color: ${({ theme }) => theme.colour.neutral.dark};
  border: 1px solid ${({ theme }) => theme.colour.primary};

  :disabled {
    background-color: ${({ theme }) => theme.colour.neutral.dark};
    color: ${({ theme }) => theme.colour.neutral.light};
    cursor: not-allowed;
  }
`;