import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { Span } from '../Typography';

const BoxContainer = styled.div`
  height: ${({ theme }) => theme.spacing.units(16)};
  margin-bottom: ${({ theme }) => theme.spacing.units(2)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  ${({ centre }) => centre && `text-align: center;`}
`;

const Row = styled.div`
  columns: 3;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${({ theme }) => theme.colour.tertiary};
  font-size: ${({ theme }) => theme.spacing.units(8)};
  opacity: 0.3;
`;

const Label = styled(Span)`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.spacing.units(3)};
`;

export function Box({ children, icon, label, centre }) {
  return (
    <BoxContainer centre={centre}>
      <Span>{children}</Span>
      {label && <Label>{label}</Label>}
      <IconContainer>{icon}</IconContainer>
    </BoxContainer>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  centre: PropTypes.bool,
};

export default function BoxList({ children }) {
  return <Row>{children}</Row>;
}

BoxList.propTypes = {
  children: PropTypes.node.isRequired,
};
