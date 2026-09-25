import styled from 

"styled-components";
export const MobileBottomNav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: ${({ theme }) => theme.zIndex.sticky};

  display: none;

  height: 64px;

  background: ${({ theme }) => theme.colors.neutral.white};

  border-top: 1px solid
    ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;