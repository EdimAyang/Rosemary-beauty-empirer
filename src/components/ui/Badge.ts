import styled from "styled-components";

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 0.35rem 0.7rem;

  color: ${({ theme }) => theme.colors.brand.gold};

  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;