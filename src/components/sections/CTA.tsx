import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";



const luxuryEase = [0.22, 1, 0.36, 1] as const;

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

const contentReveal: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

const actionsReveal: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2, ease: luxuryEase },
  },
};

const CTA = () => {
    const navigate = useNavigate()

  return (
    <MotionSection
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
    >
      {" "}
      <Glow /> <DecorativeCircle />{" "}
      <ContentWrapper>
        {" "}
        <MotionContent variants={contentReveal}>
          {" "}
          <Eyebrow>YOUR NEXT BEAUTY EXPERIENCE</Eyebrow>{" "}
          <Heading>
            {" "}
            Ready to feel <br /> <span>beautifully you?</span>{" "}
          </Heading>{" "}
          <Description>
            {" "}
            Whether you are preparing for a special occasion or simply making
            time for yourself, let us create an experience designed around
            you.{" "}
          </Description>{" "}
        </MotionContent>{" "}
        <MotionActions variants={actionsReveal}>
          {" "}
          <Button $variant="primary" onClick={()=>navigate(PATHS.BOOKING)}>
            {" "}
            Book an Appointment{" "}
            <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
          </Button>{" "}
          <Button $variant="secondary" onClick={()=>navigate(PATHS.SHOP)}>
            {" "}
            Shop Collection <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
          </Button>{" "}
        </MotionActions>{" "}
      </ContentWrapper>{" "}
    </MotionSection>
  );
};
export default CTA;
/* ========================================= SECTION ========================================= */ const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.brand.black};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 560px;
    padding: ${({ theme }) => theme.spacing[24]}
      ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 580px;
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[4]};
  }
`;
const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
/* ========================================= DECORATION ========================================= */ const Glow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 162, 39, 0.12) 0%,
    rgba(201, 162, 39, 0.05) 35%,
    transparent 70%
  );
  pointer-events: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 400px;
    height: 400px;
  }
`;
const DecorativeCircle = styled.div`
  position: absolute;
  width: 520px;
  height: 520px;
  border: 1px solid rgba(201, 162, 39, 0.16);
  border-radius: 50%;
  pointer-events: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 420px;
    height: 420px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 320px;
    height: 320px;
  }
`;
/* ========================================= CONTENT ========================================= */ const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold[300]};
`;
const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["5xl"]},
    7vw,
    ${({ theme }) => theme.fontSizes["7xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.92;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.neutral.white};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["4xl"]},
      10vw,
      ${({ theme }) => theme.fontSizes["6xl"]}
    );
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["5xl"]};
    line-height: 0.95;
  }
`;
const Description = styled.p`
  max-width: 520px;
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: rgba(250, 248, 242, 0.62);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;
/* ========================================= ACTIONS ========================================= */ const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
  button {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[8]};
    button {
      width: 100%;
    }
  }
`;

const MotionSection = motion(Section);
const MotionContent = motion(Content);
const MotionActions = motion(Actions);