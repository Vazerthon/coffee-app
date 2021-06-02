import styled from '@emotion/styled/macro';

export const Input = styled.input`
  font-size: ${({ theme }) => theme.spacing.units(4)};
  font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  height: ${({ theme }) => theme.spacing.units(6)};
  color: ${({ theme }) => theme.colour.primary};
  width: 100%;
`;

export const Textarea = styled.textarea`
  width: calc(100% - ${({ theme }) => theme.spacing.units(5)});
  padding: ${({ theme }) => theme.spacing.units(2)};
  min-height: ${({ theme }) => theme.spacing.units(20)};
  color: ${({ theme }) => theme.colour.primary};
`;
