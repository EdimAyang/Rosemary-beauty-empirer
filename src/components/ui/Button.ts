// src/components/ui/Button.ts

import styled, { css } from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "secondary" | "outline" | "ghost";
  $fullWidth?: boolean;
  $size?: "sm" | "md" | "lg";
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  border-radius: ${({ theme }) => theme.radii.sm};

  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  letter-spacing: 0.02em;

  cursor: pointer;

  transition:
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  /* --------------------------------
     SIZE
  -------------------------------- */

  ${({ $size = "md" }) => {
    switch ($size) {
      case "sm":
        return css`
          min-height: 42px;
          padding: 0 1.25rem;
          font-size: 0.75rem;
        `;

      case "lg":
        return css`
          min-height: 56px;
          padding: 0 1.75rem;
          font-size: 0.9rem;
        `;

      default:
        return css`
          min-height: 48px;
          padding: 0 1.5rem;
          font-size: 0.875rem;
        `;
    }
  }}

  /* --------------------------------
     VARIANTS
  -------------------------------- */

  ${({ $variant = "primary", theme }) => {
    switch ($variant) {
      case "secondary":
        return css`
          color: ${theme.colors.text.inverse};
          background: ${theme.colors.brand.black};
          border: 1px solid ${theme.colors.brand.black};

          &:hover {
            background: ${theme.colors.black[700]};
            border-color: ${theme.colors.black[700]};
          }
        `;

      case "outline":
        return css`
          color: ${theme.colors.text.primary};
          background: transparent;
          border: 1px solid ${theme.colors.text.primary};

          &:hover {
            color: ${theme.colors.text.inverse};
            background: ${theme.colors.background.dark};
            border-color: ${theme.colors.background.dark};
          }
        `;

      case "ghost":
        return css`
          color: ${theme.colors.text.primary};
          background: transparent;
          border: 1px solid transparent;

          &:hover {
            color: ${theme.colors.brand.gold};
          }
        `;

      default:
        return css`
          color: ${theme.colors.neutral.white};
          background: ${theme.colors.brand.gold};
          border: 1px solid ${theme.colors.brand.gold};

          &:hover {
            background: ${theme.colors.gold[500]};
            border-color: ${theme.colors.gold[500]};
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
    transform: none;
  }
`;
