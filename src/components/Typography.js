import styled from '@emotion/styled/macro';

export const Span = styled.span`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  ${({ centre }) => centre && 'text-align: center;'}
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
  ${({ capitalise }) => capitalise && 'text-transform: capitalize;'}
  ${({ small, theme }) => small && `font-size: ${theme.spacing.units(3)};`}
`;

export const P = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
  ${({ centre }) => centre && 'text-align: center;'}
  ${({ capitalise }) => capitalise && 'text-transform: capitalize;'}
`;

export const H1 = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.spacing.units(6)};
  font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  margin-bottom: ${({ theme }) => theme.spacing.units(3)};
  ${({ centre }) => centre && 'text-align: center;'}
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
  ${({ capitalise }) => capitalise && 'text-transform: capitalize;'}
`;

export const H2 = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.spacing.units(5)};
  font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  ${({ centre }) => centre && 'text-align: center;'}
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
  ${({ capitalise }) => capitalise && 'text-transform: capitalize;'}
`;