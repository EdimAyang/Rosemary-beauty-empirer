import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { PATHS } from "@/router/paths";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/Button";
import InstallButton from "./InstallButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header $isScrolled={isScrolled}>
        <Logo href="/" onClick={closeMenu}>
          <LogoText>
            Rosemary <span>Beauty Empire</span>
          </LogoText>
        </Logo>

        {/* Desktop Navigation */}
        <Nav>
          <NavLink to={PATHS.HOME} end>
            Home
          </NavLink>

          <NavLink to={PATHS.SHOP}>Shop</NavLink>

          <NavLink to={PATHS.SERVICE}>Services</NavLink>

          {/* <NavLink to="/#about">About</NavLink>

          <NavLink to="/#contact">Contact</NavLink> */}
        </Nav>

        {/* Desktop / Mobile Actions */}
        <MobileActions>
          <CartButtonWrapper>
            <CartButton
              type="button"
              aria-label="Shopping cart"
              onClick={openCart}
            >
              <ShoppingBag size={21} strokeWidth={1.7} />

              {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
            </CartButton>
          </CartButtonWrapper>

          <MenuButton
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.6} />
            )}
          </MenuButton>

          <ButtonWrapper
            type="button"
            $size="md"
            $variant="primary"
            children="Booking"
            $fullWidth
            onClick={() => navigate(PATHS.BOOKING)}
          />

          <InstallButton />
        </MobileActions>
      </Header>

      {/* Mobile Navigation */}
      <MobileMenu $isOpen={isMenuOpen}>
        <MobileMenuHeader>
          <span>Menu</span>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={24} strokeWidth={1.6} />
          </button>
        </MobileMenuHeader>

        <MobileNav>
          <MobileNavLink to={PATHS.HOME} end onClick={closeMenu}>
            Home
          </MobileNavLink>

          <MobileNavLink to={PATHS.SHOP} onClick={closeMenu}>
            Shop
          </MobileNavLink>

          <MobileNavLink to={PATHS.SERVICE} onClick={closeMenu}>
            Services
          </MobileNavLink>

          {/* <MobileNavLink to="/#about" onClick={closeMenu}>
            About
          </MobileNavLink>

          <MobileNavLink to="/#contact" onClick={closeMenu}>
            Contact
          </MobileNavLink> */}
        </MobileNav>
        <Button
          type="button"
          $size="md"
          $variant="primary"
          children="Booking"
          $fullWidth
          onClick={() => navigate(PATHS.BOOKING)}
        />
      </MobileMenu>
    </>
  );
};

export default Navbar;

const ButtonWrapper = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const Header = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.layout.headerHeight};
  padding: 0 ${({ theme }) => theme.spacing[8]};

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  z-index: ${({ theme }) => theme.zIndex.header};

  background: ${({ $isScrolled }) =>
    $isScrolled ? "rgba(5, 5, 5, 0.72)" : "transparent"};

  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(18px)" : "none"};

  -webkit-backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(18px)" : "none"};

  border-bottom: ${({ $isScrolled }) =>
    $isScrolled
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid transparent"};

  transition:
    background ${({ theme }) => theme.transitions.normal},
    backdrop-filter ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};

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
const NavLink = styled(RouterNavLink)`
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.normal};

  &.active {
    color: ${({ theme }) => theme.colors.brand.gold};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;

export const MobileActions = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 250px;
  justify-content: flex-end;
`;

const CartButtonWrapper = styled.div`
  width: 50px;
  height: 100%;
`;

export const CartButton = styled.button`
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

export const MenuButton = styled.button`
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

export const MobileMenu = styled.div<{
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
    visibility
      ${({ $isOpen, theme }) => ($isOpen ? "0ms" : theme.transitions.slow)};

  // @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
  //   display: none;
  // }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[4]};
  }
`;

export const MobileMenuHeader = styled.div`
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

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing[8]};
  margin-bottom: 5rem;
`;

export const MobileNavLink = styled(RouterNavLink)`
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
