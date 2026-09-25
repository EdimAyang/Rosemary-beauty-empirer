import styled from "styled-components";



export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};

  height: ${({ theme }) => theme.layout.headerHeight};

  background: rgba(250, 248, 242, 0.94);

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border.light};

  backdrop-filter: blur(12px);
`;

export const HeaderInner = styled.div`
  width: min(
    calc(100% - 2rem),
    ${({ theme }) => theme.layout.maxWidth}
  );

  height: 100%;
  margin-inline: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;