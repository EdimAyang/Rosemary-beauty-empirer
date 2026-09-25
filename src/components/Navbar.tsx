import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

import styled from "styled-components";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      {" "}
      <Header>
        {" "}
        {/* Logo */}{" "}
        <Logo href="/" onClick={closeMenu}>
          {" "}
          <LogoText>
            {" "}
            Rosemary <span>Beauty Empire</span>{" "}
          </LogoText>{" "}
        </Logo>{" "}
        {/* Desktop Navigation */}{" "}
        <Nav>
          {" "}
          <NavLink href="/" className="active">
            {" "}
            Home{" "}
          </NavLink>{" "}
          <NavLink href="#shop"> Shop </NavLink>{" "}
          <NavLink href="#services"> Services </NavLink>{" "}
          <NavLink href="#about"> About </NavLink>{" "}
          <NavLink href="#contact"> Contact </NavLink>{" "}
        </Nav>{" "}
        {/* Desktop / Mobile Actions */}{" "}
        <MobileActions>
          {" "}
          <CartButton type="button" aria-label="Shopping cart">
            {" "}
            <ShoppingBag size={21} strokeWidth={1.7} />{" "}
            <CartCount>0</CartCount>{" "}
          </CartButton>{" "}
          {/* Mobile menu button */}{" "}
          <MenuButton
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {" "}
            {isMenuOpen ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.6} />
            )}{" "}
          </MenuButton>{" "}
        </MobileActions>{" "}
      </Header>{" "}
      {/* Mobile Navigation */}{" "}
      <MobileMenu $isOpen={isMenuOpen}>
        {" "}
        <MobileMenuHeader>
          {" "}
          <span>Menu</span>{" "}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            {" "}
            <X size={24} strokeWidth={1.6} />{" "}
          </button>{" "}
        </MobileMenuHeader>{" "}
        <MobileNav>
          {" "}
          <MobileNavLink href="/" className="active" onClick={closeMenu}>
            {" "}
            Home{" "}
          </MobileNavLink>{" "}
          <MobileNavLink href="#shop" onClick={closeMenu}>
            {" "}
            Shop{" "}
          </MobileNavLink>{" "}
          <MobileNavLink href="#services" onClick={closeMenu}>
            {" "}
            Services{" "}
          </MobileNavLink>{" "}
          <MobileNavLink href="#about" onClick={closeMenu}>
            {" "}
            About{" "}
          </MobileNavLink>{" "}
          <MobileNavLink href="#contact" onClick={closeMenu}>
            {" "}
            Contact{" "}
          </MobileNavLink>{" "}
        </MobileNav>{" "}
      </MobileMenu>{" "}
    </>
  );
};
export default Navbar;

/* ========================================================= HEADER ========================================================= */ export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.layout.headerHeight};
  padding: 0 ${({ theme }) => theme.spacing[8]};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: transparent;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 64px;
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;
/* ========================================================= LOGO ========================================================= */ export const Logo = styled.a`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;
export const LogoText = styled.span`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 0.8;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.neutral.white};
  span {
    margin-top: 6px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.45rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold[300]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    span {
      font-size: 0.4rem;
      letter-spacing: 0.2em;
    }
  }
`;
/* ========================================================= DESKTOP NAVIGATION ========================================================= */ export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  justify-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
export const NavLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.neutral.white};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
  &.active {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;
/* ========================================================= RIGHT-SIDE ACTIONS ========================================================= */ export const MobileActions = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;
/* ========================================================= CART ========================================================= */ export const CartButton = styled.button`
  position: relative;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
    background: rgba(201, 162, 39, 0.08);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 3px;
  }
`;
export const CartCount = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brand.gold};
  color: ${({ theme }) => theme.colors.brand.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
`;
/* ========================================================= MOBILE MENU BUTTON ========================================================= */ export const MenuButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
    background: rgba(201, 162, 39, 0.08);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 3px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;
/* ========================================================= MOBILE MENU ========================================================= */ export const MobileMenu = styled.div<{
  $isOpen: boolean;
}>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background.dark};
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition:
    transform ${({ theme }) => theme.transitions.slow},
    opacity ${({ theme }) => theme.transitions.normal},
    visibility ${({ $isOpen, theme }) => ($isOpen ? "0ms" : theme.transitions.slow)};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[4]};
  }
`;
/* ========================================================= MOBILE MENU HEADER ========================================================= */ export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold[300]};
  }
  button {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.neutral.white};
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};
    &:hover {
      color: ${({ theme }) => theme.colors.brand.gold};
    }
  }
`;
/* ========================================================= MOBILE NAVIGATION ========================================================= */ export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing[8]};
`;
export const MobileNavLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  color: ${({ theme }) => theme.colors.neutral.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    padding-left ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    padding-left: ${({ theme }) => theme.spacing[2]};
  }
  &.active {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;
