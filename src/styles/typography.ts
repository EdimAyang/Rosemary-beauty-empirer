// src/styles/typography.ts

import styled from "styled-components";

export const Display = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 500;
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: -0.02em;
`;

export const Heading1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const Heading2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const Heading3 = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 500;
  line-height: ${({ theme }) => theme.lineHeights.snug};
`;

export const BodyLarge = styled.p`
  font-size: 1.125rem;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const Body = styled.p`
  font-size: 1rem;
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const BodySmall = styled.p`
  font-size: 0.875rem;
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const Caption = styled.span`
  font-size: 0.75rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text.muted};
`;