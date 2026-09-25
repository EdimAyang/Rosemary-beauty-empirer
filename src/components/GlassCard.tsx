import styled from "styled-components";

const HottestProducts = () => {
  return (
    <HotProductsCard>
      {" "}
      <HotProductsHeader>
        {" "}
        <div>
          {" "}
          <HotProductsLabel> Trending now </HotProductsLabel>{" "}
          <HotProductsTitle> Hottest Products </HotProductsTitle>{" "}
        </div>{" "}
        <ProductArrow>↗</ProductArrow>{" "}
      </HotProductsHeader>{" "}
      <ProductsList>
        {" "}
        <ProductItem>
          {" "}
          <ProductImage
            src="/images/products/product-1.jpg"
            alt="Luxury beauty product"
          />{" "}
          <ProductInfo>
            {" "}
            <ProductName> Radiance Collection </ProductName>{" "}
            <ProductPrice> ₦25,000 </ProductPrice>{" "}
          </ProductInfo>{" "}
        </ProductItem>{" "}
        <ProductItem>
          {" "}
          <ProductImage
            src="/images/products/product-2.jpg"
            alt="Premium beauty product"
          />{" "}
          <ProductInfo>
            {" "}
            <ProductName> Signature Glow </ProductName>{" "}
            <ProductPrice> ₦18,500 </ProductPrice>{" "}
          </ProductInfo>{" "}
        </ProductItem>{" "}
      </ProductsList>{" "}
    </HotProductsCard>
  );
};
export default HottestProducts;

export const HotProductsCard = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing[8]};
  bottom: ${({ theme }) => theme.spacing[8]};
  z-index: ${({ theme }) => theme.zIndex.base + 2};
  width: 330px;
  padding: ${({ theme }) => theme.spacing[5]};
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: ${({ theme }) => theme.radii.xl}; /* Liquid glass effect */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  color: ${({ theme }) => theme.colors.neutral.white};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: ${({ theme }) => theme.spacing[6]};
    bottom: ${({ theme }) => theme.spacing[6]};
    width: 300px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[4]};
    width: calc(100% - 2rem);
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;
/* ========================================================= HEADER ========================================================= */ export const HotProductsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
export const HotProductsLabel = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold[300]};
`;
export const HotProductsTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.neutral.white};
`;
export const ProductArrow = styled.button`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.neutral.white};
  font-size: 1rem;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.black};
    background: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }
`;
/* ========================================================= PRODUCTS ========================================================= */ export const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;
export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.06);
  transition:
    background ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  &:hover {
    background: rgba(255, 255, 255, 0.11);
    transform: translateX(-3px);
  }
`;
export const ProductImage = styled.img`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.neutral.cream};
`;
export const ProductInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const ProductName = styled.span`
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.neutral.white};
`;
export const ProductPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gold[300]};
`;
