import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import styled from '@emotion/styled';
import { Menu, Close } from './Icons';

import { routesType } from '../Types';
import Link from './Link';
import { H1 } from './Typography';

const List = styled.ul`
  list-style: none;
  justify-content: flex-end;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.units(14)};
  width: 100%;
  background-color: ${({ theme }) => theme.colour.secondary};
  position: absolute;
  z-index: 1;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  ${({ open }) => open || 'transform: translateX(100%);'}
  ${({ open }) => open && 'box-shadow: 0 6px 8px -8px'};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 ${({ theme }) => theme.spacing.units(4)};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.spacing.units(6)};
  line-height: ${({ theme }) => theme.spacing.units(10)};
  ${({ active }) => active && `text-decoration: underline`};
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.spacing.units(8)};
  color: ${({ theme }) => theme.colour.primary};
`;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const IconRow = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colour.secondary};
  height: ${({ theme }) => theme.spacing.units(12)};
  padding-top: ${({ theme }) => theme.spacing.units(2)};
  padding-right: ${({ theme }) => theme.spacing.units(2)};
  padding-left: ${({ theme }) => theme.spacing.units(2)};
  justify-content: space-between;
  align-items: center;
`;

function NavListItem({ href, active, label, onClick }) {
  return <ListItem>
    <NavLink tabIndex="0" href={href} active={active} onClick={onClick}>
      {label}
    </NavLink>
  </ListItem>
}

NavListItem.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Nav({ routes, currentPath, title }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeDrawer = () => setMobileDrawerOpen(false);
  const Wrapper = mobileDrawerOpen ? FocusTrap : Fragment;

  return (
    <Wrapper>
      <Container open={mobileDrawerOpen}>
        <IconRow>
          <H1>{title}</H1>
          <MenuButton
            type="button"
            onClick={toggleDrawer}
            aria-label={
              mobileDrawerOpen
                ? 'close navigation menu'
                : 'open navigation menu'
            }
          >
            {mobileDrawerOpen && <Close />}
            {!mobileDrawerOpen && <Menu />}
          </MenuButton>
        </IconRow>
        <List role="list" open={mobileDrawerOpen}>
          <NavListItem
            href={routes.home}
            label="Home"
            onClick={closeDrawer}
            active={currentPath === routes.home}
          />
          <NavListItem
            href={routes.makeAddPath()}
            label="Add Brew"
            onClick={closeDrawer}
            active={currentPath === routes.add}
          />
          <NavListItem
            href={routes.beans}
            label="Beans"
            onClick={closeDrawer}
            active={currentPath === routes.beans}
          />
          <NavListItem
            href={routes.about}
            label="About"
            onClick={closeDrawer}
            active={currentPath === routes.about}
          />
        </List>
      </Container>
    </Wrapper>
  );
}

Nav.propTypes = {
  routes: routesType.isRequired,
  currentPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
