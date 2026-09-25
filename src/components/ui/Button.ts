// src/components/ui/Button.ts

import styled, { css } from "styled-components";

export const Button = styled.button<{
  $variant?: "primary" | "secondary" | "outline" | "ghost";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 48px;
  padding: 0 1.5rem;

  border-radius: ${({ theme }) => theme.radii.sm};

  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  transition:
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    border ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ $variant = "primary", theme }) => {
    switch ($variant) {
      case "secondary":
        return css`
          color: ${theme.colors.text.inverse};
          background: ${theme.colors.brand.black};

          &:hover {
            background: ${theme.colors.black[700]};
          }
        `;

      case "outline":
        return css`
          color: ${theme.colors.neutral.white};
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.6);

          &:hover {
            color: ${theme.colors.brand.black};
            background: ${theme.colors.brand.gold};
            border-color: ${theme.colors.brand.gold};
          }
        `;

      case "ghost":
        return css`
          color: ${theme.colors.text.primary};
          background: transparent;

          &:hover {
            color: ${theme.colors.brand.gold};
          }
        `;

      default:
        return css`
          color: ${theme.colors.neutral.white};
          background: ${theme.colors.brand.gold};

          &:hover {
            background: ${theme.colors.gold[500]};
          }
        `;
    }
  }}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
