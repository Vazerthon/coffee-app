import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import styled from '@emotion/styled';
import { Menu, Close } from './Icons';

import { routesType } from '../Types';

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

const NavLink = styled.a`
  color: ${({ theme }) => theme.colour.primary};
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
`;

const IconRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: ${({ theme }) => theme.colour.secondary};
  height: ${({ theme }) => theme.spacing.units(12)};
  padding-top: ${({ theme }) => theme.spacing.units(2)};
  padding-right: ${({ theme }) => theme.spacing.units(2)};
`;

const NavListItem = ({ href, active, label, onClick }) => (
  <ListItem>
    <NavLink tabIndex="0" href={href} active={active} onClick={onClick}>
      {label}
    </NavLink>
  </ListItem>
);

NavListItem.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Nav({ routes, currentPath }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeDrawer = () => setMobileDrawerOpen(false);
  const Wrapper = mobileDrawerOpen ? FocusTrap : Fragment;

  return (
    <Wrapper>
      <Container open={mobileDrawerOpen}>
        <IconRow>
          <MenuButton
            type="button"
            onClick={toggleDrawer}
            aria-label={
              mobileDrawerOpen ? 'close navigation menu' : 'open navigation menu'
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
            href={routes.add}
            label="Add Brew"
            onClick={closeDrawer}
            active={currentPath === routes.add}
          />
        </List>
      </Container>
    </Wrapper>
  );
}

Nav.propTypes = {
  routes: routesType.isRequired,
  currentPath: PropTypes.string.isRequired,
};
