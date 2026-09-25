import styled from 

"styled-components";
export const GoldDivider = styled.span`
  display: block;

  width: 48px;
  height: 2px;

  margin: 1rem 0;

  background: ${({ theme }) => theme.colors.brand.gold};
`;