import styled from "styled-components";

export const LuxurySection = styled.section`
  position: relative;

  padding: 6rem 0;

  color: ${({ theme }) => theme.colors.text.inverse};

  background: ${({ theme }) => theme.colors.background.dark};

  overflow: hidden;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background:
      radial-gradient(
        circle at 80% 20%,
        rgba(201, 162, 39, 0.14),
        transparent 35%
      );

    pointer-events: none;
  }
`;