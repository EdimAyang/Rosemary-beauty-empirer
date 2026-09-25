import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavLink = styled.a`
  position: relative;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
  }

  &.active {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;