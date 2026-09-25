import styled from "styled-components";


export const ProductCard = styled.article`
  background: ${({ theme }) => theme.colors.background.card};
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;

  background: ${({ theme }) => theme.colors.neutral.cream};
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: transform ${({ theme }) => theme.transitions.slow};

  ${ProductCard}:hover & {
    transform: scale(1.04);
  }
`;

export const ProductInfo = styled.div`
  padding: 1rem 0;
`;

export const ProductName = styled.h3`
  margin-bottom: 0.35rem;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 500;
`;

export const ProductPrice = styled.span`
  color: ${({ theme }) => theme.colors.brand.gold};
  font-size: 0.95rem;
  font-weight: 600;
`;