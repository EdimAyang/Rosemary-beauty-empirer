import styled from "styled-components";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { useState } from "react";
import type { Product } from "@/interface";
import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";

const formattedPrice = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const products: Product[] = [
  {
    id: 1,
    name: "Radiance Collection",
    category: "Skincare",
    description:
      "A luxurious collection designed to restore your natural glow and leave your skin beautifully radiant.",
    price: 25000,
    image: "/images/products/product-1.jpg",
  },
  {
    id: 2,
    name: "Signature Glow",
    category: "Body Care",
    description:
      "Indulge your skin with a nourishing formula created for a soft, luminous finish.",
    price: 18500,
    image: "/images/products/product-2.jpg",
  },
  {
    id: 3,
    name: "Golden Essence",
    category: "Beauty",
    description:
      "An elegant beauty essential crafted to complement your everyday self-care ritual.",
    price: 22000,
    image: "/images/products/product-3.jpg",
  },
  {
    id: 4,
    name: "Velvet Touch",
    category: "Makeup",
    description:
      "A refined beauty staple that brings effortless definition and a polished finish.",
    price: 15000,
    image: "/images/products/product-4.jpg",
  },
];

const SectionReveal: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const ContentReveal: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const CarouselControls = ({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) => {
  const swiper = useSwiper();
 

  return (
    <Navigation>
      <Progress>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>

        <i />

        <span>{String(total).padStart(2, "0")}</span>
      </Progress>

      <NavigationButton
        type="button"
        aria-label="Previous product"
        onClick={() => swiper.slidePrev()}
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
      </NavigationButton>

      <NavigationButton
        type="button"
        aria-label="Next product"
        onClick={() => swiper.slideNext()}
      >
        <ArrowRight size={18} strokeWidth={1.5} />
      </NavigationButton>
    </Navigation>
  );
};

const FeaturedProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
   const navigate = useNavigate()

  return (
    <Wrapper
      as={motion.section}
      variants={SectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {" "}
      <SectionHeader as={motion.div} variants={ContentReveal}>
        {" "}
        <div>
          {" "}
          <Eyebrow>Curated for you</Eyebrow>{" "}
          <Heading>
            {" "}
            The <span> edit.</span>{" "}
          </Heading>{" "}
        </div>{" "}
        <Intro>
          {" "}
          Discover our selection of beauty essentials, carefully chosen to
          elevate your everyday ritual.{" "}
        </Intro>{" "}
      </SectionHeader>{" "}
      <CarouselWrapper as={motion.div} variants={ContentReveal}>
        {" "}
        <Swiper
          grabCursor
          slidesPerView={1}
          speed={900}
          loop
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          creativeEffect={{
            prev: { translate: ["-100%", 0, 0], opacity: 0 },
            next: { translate: ["100%", 0, 0], opacity: 0 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductStage>
                <ProductImageWrapper>
                  <ProductImage
                    as={motion.img}
                    src={product.image}
                    alt={product.name}
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <ProductNumber>
                    {String(index + 1).padStart(2, "0")}
                  </ProductNumber>
                </ProductImageWrapper>

                <ProductDetails
                  as={motion.div}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCategory>{product.category}</ProductCategory>

                  <ProductName>{product.name}</ProductName>

                  <ProductDescription>{product.description}</ProductDescription>

                  <ProductPrice>
                    {formattedPrice.format(product.price)}
                  </ProductPrice>

                  <ProductAction type="button" onClick={()=>navigate(PATHS.SHOP)}>
                    <span>Discover product</span>

                    <Plus size={18} strokeWidth={1.5} />
                  </ProductAction>

                  <CarouselControls
                    total={products.length}
                    activeIndex={activeIndex}
                  />
                </ProductDetails>
              </ProductStage>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselWrapper>{" "}
    </Wrapper>
  );
};
export default FeaturedProducts;

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[24]}
      ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[4]};
  }
`;

export const SectionHeader = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto ${({ theme }) => theme.spacing[16]};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[10]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing[12]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[5]};
  }
`;
export const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.gold};
`;
export const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.85;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.text.primary};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
`;
export const Intro = styled.p`
  max-width: 360px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CarouselWrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};

  margin: 0 auto;

  overflow: hidden;

  .swiper {
    width: 100%;
    overflow: hidden;
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .swiper-slide-active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

export const ProductStage = styled.div`
  position: relative;
  width: 100%;
  min-height: 620px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 540px;
    grid-template-columns: 1fr 0.8fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 580px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral.cream};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 480px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 420px;
  }
`;
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform-origin: center;
`;
export const ProductNumber = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing[5]};
  left: ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral.white};
  mix-blend-mode: difference;
`;

export const ProductDetails = styled.div`
  position: relative;

  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]}
    ${({ theme }) => theme.spacing[6]} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

export const ProductCategory = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.gold};
`;
export const ProductName = styled.h3`
  max-width: 420px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text.primary};
`;
export const ProductDescription = styled.p`
  max-width: 390px;
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProductPrice = styled.p`
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.brand.gold};
`;

export const ProductAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  margin-top: ${({ theme }) => theme.spacing[8]};
  padding: 0 0 ${({ theme }) => theme.spacing[2]};

  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brand.gold};

  background: transparent;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  letter-spacing: 0.04em;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  transition:
    color ${({ theme }) => theme.transitions.fast},
    gap ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    gap: ${({ theme }) => theme.spacing[5]};

    color: ${({ theme }) => theme.colors.brand.gold};

    border-color: ${({ theme }) => theme.colors.gold[500]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 4px;
  }
`;

export const NavigationButton = styled.button`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ theme }) => theme.colors.neutral.white};

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  transition:
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.gold};

    background: ${({ theme }) => theme.colors.brand.gold};

    color: ${({ theme }) => theme.colors.brand.black};

    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  margin-right: ${({ theme }) => theme.spacing[2]};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  letter-spacing: 0.08em;

  color: ${({ theme }) => theme.colors.text.muted};

  span:first-child {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  i {
    display: block;

    width: 28px;
    height: 1px;

    background: ${({ theme }) => theme.colors.border.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: auto;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  margin-top: ${({ theme }) => theme.spacing[10]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;
