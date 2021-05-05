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

export function Box({ children, icon, label, centre, capitalise }) {
  return (
    <BoxContainer centre={centre}>
      <Span capitalise={capitalise}>{children}</Span>
      {label && <Span uppercase small>{label}</Span>}
      <IconContainer>{icon}</IconContainer>
    </BoxContainer>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  centre: PropTypes.bool,
  capitalise: PropTypes.bool,
};

Box.defaultProps = {
  label: undefined,
  centre: false,
  capitalise: false,
};

export default function BoxList({ children }) {
  return <Row>{children}</Row>;
}

BoxList.propTypes = {
  children: PropTypes.node.isRequired,
};
