import styled from "styled-components";
import { Button } from "./ui/Button";
import Navbar from "./Navbar";
import HottestProducts from "./GlassCard";

const Hero = () => {
  const heroImage = "/images/hero.jpg";
  const heroVideo = "/rose-video.mp4";

  return (
    <HeroWrapper>
      <Navbar />
      {/* Background video */}
      <HeroVideo
        src={heroVideo}
        poster={heroImage}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <HeroOverlay />

      {/* Hero content */}
      <HeroContent>
        <HeroEyebrow>Rosemary Beauty Empire</HeroEyebrow>

        <HeroTitle>
          Beauty,
          <br />
          <span>redefined.</span>
        </HeroTitle>

        {/* <HeroDescription>
          Discover premium beauty products and exceptional beauty services
          designed to make you feel confident, beautiful, and unforgettable.
        </HeroDescription> */}

        <HeroActions>
          <Button $variant="primary">Shop Collection</Button>

          <Button $variant="outline">Explore Services</Button>
        </HeroActions>
      </HeroContent>

      <HottestProducts />
    </HeroWrapper>
  );
};

export default Hero;

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.dark};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 90vh;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 150vh;
  }
`;

/* ========================================================= HERO VIDEO ========================================================= */ export const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: ${({ theme }) => theme.zIndex.base - 1};
  pointer-events: none;
`;
/* ========================================================= DARK OVERLAY ========================================================= */ export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
  background: linear-gradient(
    90deg,
    rgba(5, 5, 5, 0.82) 0%,
    rgba(5, 5, 5, 0.68) 35%,
    rgba(5, 5, 5, 0.4) 65%,
    rgba(5, 5, 5, 0.2) 100%
  );
  pointer-events: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    background: linear-gradient(
      90deg,
      rgba(5, 5, 5, 0.78) 0%,
      rgba(5, 5, 5, 0.58) 100%
    );
  }
`;
/* ========================================================= HERO CONTENT ========================================================= */ export const HeroContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base + 1};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[24]}
    ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[12]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[16]}
      ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[10]};
  }
`;
/* ========================================================= EYEBROW ========================================================= */ export const HeroEyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold[300]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
/* ========================================================= HERO TITLE ========================================================= */ export const HeroTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["5xl"]},
    8vw,
    ${({ theme }) => theme.fontSizes["7xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text.inverse};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["4xl"]},
      11vw,
      ${({ theme }) => theme.fontSizes["6xl"]}
    );
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["4xl"]},
      15vw,
      ${({ theme }) => theme.fontSizes["5xl"]}
    );
    line-height: 0.95;
  }
`;
/* ========================================================= DESCRIPTION ========================================================= */ export const HeroDescription = styled.p`
  max-width: 560px;
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: rgba(250, 248, 242, 0.82);
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 520px;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`;
/* ========================================================= HERO ACTIONS ========================================================= */ export const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;
