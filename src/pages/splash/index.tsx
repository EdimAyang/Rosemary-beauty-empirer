import { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

interface SplashPageProps {
  onComplete?: () => void;
}

const SplashPage = ({ onComplete }: SplashPageProps) => {
  useEffect(() => {
    if (!onComplete) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SplashWrapper>
      <Glow />

      <Content>
        {/* Logo */}
        <LogoWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Logo src="/images/logo.png" alt="Rosemary Beauty Empire" />
        </LogoWrapper>

        {/* Brand */}
        <BrandName
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Rosemary Beauty Empire
        </BrandName>

        <Tagline
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
        >
          Beauty, redefined.
        </Tagline>

        {/* Loading line */}
        <Loader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <LoaderTrack>
            <LoaderProgress
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
              }}
            />
          </LoaderTrack>

          <LoaderText>Entering the beauty experience</LoaderText>
        </Loader>
      </Content>

      <BottomText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Premium beauty · Exceptional service
      </BottomText>
    </SplashWrapper>
  );
};

export default SplashPage;

const SplashWrapper = styled.main`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal + 100};

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 40%,
      rgba(201, 162, 39, 0.08),
      transparent 35%
    ),
    ${({ theme }) => theme.colors.brand.black};
`;

const Glow = styled.div`
  position: absolute;

  width: 420px;
  height: 420px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.brand.gold};

  opacity: 0.045;

  filter: blur(100px);

  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;

  width: min(90%, 600px);

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

const LogoWrapper = styled(motion.div)`
  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90px;
    height: 90px;

    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const BrandName = styled(motion.h1)`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  line-height: ${({ theme }) => theme.lineHeights.tight};

  color: ${({ theme }) => theme.colors.text.inverse};
`;

const Tagline = styled(motion.p)`
  margin: ${({ theme }) => theme.spacing[3]} 0 0;

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  font-style: italic;

  color: ${({ theme }) => theme.colors.brand.goldLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Loader = styled(motion.div)`
  width: min(280px, 80%);

  margin-top: ${({ theme }) => theme.spacing[16]};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderTrack = styled.div`
  width: 100%;
  height: 1px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.18);
`;

const LoaderProgress = styled(motion.div)`
  height: 100%;

  background: ${({ theme }) => theme.colors.brand.gold};
`;

const LoaderText = styled.span`
  margin-top: ${({ theme }) => theme.spacing[4]};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  font-weight: ${({ theme }) => theme.fontWeights.medium};

  letter-spacing: 0.14em;
  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.45);
`;

const BottomText = styled(motion.p)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[8]};

  margin: 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing[6]};
    font-size: 0.65rem;
  }
`;
