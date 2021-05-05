import styled from '@emotion/styled/macro';

export const Span = styled.span`
  margin: 0;
  ${({ centre }) => centre && 'text-align: center;'}
`;

export const P = styled.p`
  margin: 0;
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
  ${({ centre }) => centre && 'text-align: center;'}
`;