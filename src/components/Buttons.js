import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { Plus } from './Icons';

const RoundButtonBase = styled.button`
  border: 1px solid ${({ theme }) => theme.colour.primary};
  border-radius: 50%;
  color: ${({ theme }) => theme.colour.primary};
  background-color: ${({ theme }) => theme.colour.tertiary};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.units(1)};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ small, theme }) =>
    small &&
    `
    font-size: ${theme.spacing.units(4)};
    min-width: ${theme.spacing.units(8)};
    max-width: ${theme.spacing.units(8)};
    min-height: ${theme.spacing.units(8)};
    max-height: ${theme.spacing.units(8)};
  `}

  ${({ large, theme }) =>
    large &&
    `
    font-size: ${theme.spacing.units(8)};
    min-width: ${theme.spacing.units(12)};
    max-width: ${theme.spacing.units(12)};
    min-height: ${theme.spacing.units(12)};
    max-height: ${theme.spacing.units(12)};
  `}
`;

export function AddButton({ className, onClick }) {
  return (
    <RoundButtonBase
      large
      className={className}
      onClick={onClick}
      aria-label="Add new brew"
    >
      <Plus />
    </RoundButtonBase>
  );
}

AddButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

AddButton.defaultProps = {
  className: undefined,
};

export function IconButton({ onClick, className, icon: Icon, ariaLabel }) {
  return (
    <RoundButtonBase small onClick={onClick} className={className}>
      <Icon role="img" aria-label={ariaLabel} />
    </RoundButtonBase>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

IconButton.defaultProps = {
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
