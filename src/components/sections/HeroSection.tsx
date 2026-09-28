import styled from "styled-components";
import { Button } from "../ui/Button";
import Navbar from "../Navbar";
import HottestProducts from "../GlassCard";
import { motion } from "framer-motion";
import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// const letterAnimation = {
//   hidden: {
//     opacity: 0,
//   },

//   visible: (index: number) => ({
//     opacity: 1,
//     transition: {
//       duration: 0.06,
//       delay: index * 0.06,
//       ease: "easeOut",
//     },
//   }),
// };

const AnimatedText = ({
  text,
  className,
  delay = 0,
  color,
}: {
  text: string;
  className?: string;
  delay?: number;
  color?: string;
}) => {
  return (
    <span className={className}>
      {" "}
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          custom={index}
          variants={{
            hidden: { opacity: 0 },
            visible: (i: number) => ({
              opacity: 1,
              transition: {
                duration: 0.06,
                delay: delay + i * 0.06,
                ease: "easeOut",
              },
            }),
          }}
          style={{ display: "inline-block", color: `${color}` }}
        >
          {" "}
          {char === " " ? "\u00A0" : char}{" "}
        </motion.span>
      ))}{" "}
    </span>
  );
};

const Hero = () => {
  const heroImage = "/images/hero.jpg";
  const heroVideo = "/rose-video.mp4";
  const navigate = useNavigate();

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
      <HeroContent
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <HeroEyebrow as={motion.p} variants={fadeUp}>
          Rosemary Beauty Empire
        </HeroEyebrow>

        <HeroTitle>
          <AnimatedText text="Beauty," />
          <br />
          <span>
            {" "}
            <AnimatedText text="redefined." delay={0.45} color="#ffff" />{" "}
          </span>
        </HeroTitle>

        {/* <HeroDescription>
          Discover premium beauty products and exceptional beauty services
          designed to make you feel confident, beautiful, and unforgettable.
        </HeroDescription> */}

        <HeroActions
          as={motion.div}
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 1.25,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            },
          }}
        >
          <Button
            $variant="primary"
            $fullWidth
            type="button"
            $size="sm"
            onClick={() => navigate(PATHS.SHOP)}
          >
            Shop Collection
          </Button>

          <Button
            $variant="secondary"
            $fullWidth
            type="button"
            $size="sm"
            onClick={() => navigate(PATHS.SERVICE)}
          >
            Explore Services
          </Button>
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

export const HeroContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base + 1};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  margin-top: 2rem;
  padding: ${({ theme }) => theme.spacing[24]}
    ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[12]};
    margin-top: 8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[16]}
      ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[10]};
    margin-top: 8rem;
  }
`;

export const HeroEyebrow = styled.p`
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
  flex-direction: column;
  width: 30%;
  max-width: 70%;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
     max-width: 70%;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;
