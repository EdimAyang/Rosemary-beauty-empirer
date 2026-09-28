import { motion, type Variants } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
// import { Button } from "@/components/ui/Button";
const luxuryEase = [0.22, 1, 0.36, 1] as const;
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};
const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: luxuryEase },
  },
};
const contentReveal: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: luxuryEase },
  },
};

// const detailReveal: Variants = {
//   hidden: { opacity: 0, y: 25 },
//   visible: (index: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.65, delay: index * 0.12, ease: luxuryEase },
//   }),
// };

const About = () => {
  return (
    <MotionSection
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
    >
      {" "}
      <AboutInner>
        {" "}
        <ImageColumn>
          {" "}
          <MotionImageWrapper variants={imageReveal}>
            {" "}
            <AboutImage
              src="/images/about/about.jpg"
              alt="Rosemary Beauty Empire beauty experience"
            />{" "}
            <ImageOverlay />{" "}
            <ImageCaption>
              {" "}
              <CaptionLine /> <CaptionText>THE RBE EXPERIENCE</CaptionText>{" "}
            </ImageCaption>{" "}
          </MotionImageWrapper>{" "}
          <FloatingMark>
            {" "}
            <MarkText>R</MarkText> <MarkSubtext>RBE</MarkSubtext>{" "}
          </FloatingMark>{" "}
        </ImageColumn>{" "}
        <MotionContent variants={contentReveal}>
          {" "}
          <Eyebrow>ABOUT RBE</Eyebrow>{" "}
          <Heading>
            {" "}
            Beauty is not <br /> <span>just how you look.</span>{" "}
          </Heading>{" "}
          <GoldLine />{" "}
          <Description>
            {" "}
            At Rosemary Beauty Empire, we believe beauty is an experience. Every
            detail, from the products you choose to the way you feel when you
            leave our space, is thoughtfully created to help you express your
            most confident self.{" "}
          </Description>{" "}
          <Description>
            {" "}
            Our approach brings together artistry, quality, and an appreciation
            for timeless elegance. Whether you are preparing for an important
            occasion or simply taking time for yourself, we create beauty
            experiences that feel personal, refined, and unforgettable.{" "}
          </Description>{" "}

          {/* <Details>
            {" "}
            <MotionDetail custom={0} variants={detailReveal}>
              {" "}
              <DetailNumber>01</DetailNumber>{" "}
              <DetailContent>
                {" "}
                <DetailTitle>Our Philosophy</DetailTitle>{" "}
                <DetailText>
                  {" "}
                  Beauty should feel personal, effortless, and empowering.{" "}
                </DetailText>{" "}
              </DetailContent>{" "}

            </MotionDetail>{" "}
            <MotionDetail custom={1} variants={detailReveal}>
              {" "}
              <DetailNumber>02</DetailNumber>{" "}
              <DetailContent>
                {" "}
                <DetailTitle>Our Promise</DetailTitle>{" "}
                <DetailText>
                  {" "}
                  Thoughtful service, quality products, and attention to every
                  detail.{" "}
                </DetailText>{" "}
              </DetailContent>{" "}
            </MotionDetail>{" "}
          </Details>{" "}
          <ButtonWrapper>
            {" "}
            <Button $variant="secondary">
              {" "}
              Discover our story{" "}
              <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
            </Button>{" "}
          </ButtonWrapper>{" "} */}
        </MotionContent>{" "}
      </AboutInner>{" "}
    </MotionSection>
  );
};
export default About;

// const DetailText = styled.p`
//   margin: 0;
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-size: ${({ theme }) => theme.fontSizes.sm};
//   line-height: ${({ theme }) => theme.lineHeights.normal};
//   color: ${({ theme }) => theme.colors.text.muted};
// `;

// const DetailTitle = styled.h3`
//   margin: 0 0 ${({ theme }) => theme.spacing[2]};
//   font-family: ${({ theme }) => theme.fonts.display};
//   font-size: ${({ theme }) => theme.fontSizes.xl};
//   font-weight: ${({ theme }) => theme.fontWeights.semibold};
//   line-height: ${({ theme }) => theme.lineHeights.snug};
//   color: ${({ theme }) => theme.colors.text.primary};
// `;

// const DetailNumber = styled.span`
//   flex-shrink: 0;
//   font-family: ${({ theme }) => theme.fonts.mono};
//   font-size: ${({ theme }) => theme.fontSizes.xs};
//   color: ${({ theme }) => theme.colors.brand.gold};
// `;
// const DetailContent = styled.div`
//   min-width: 0;
// `;

// const Details = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   margin-top: ${({ theme }) => theme.spacing[10]};
//   border-top: 1px solid ${({ theme }) => theme.colors.border.light};
//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     grid-template-columns: 1fr;
//   }
// `;

const Section = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background.primary};
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[24]}
      ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[4]};
  }
`;
const AboutInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[20]};
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    gap: ${({ theme }) => theme.spacing[12]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[16]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[12]};
  }
`;
/* ========================================= IMAGE ========================================= */ const ImageColumn = styled.div`
  position: relative;
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: ${({ theme }) => theme.spacing[4]};
    padding-bottom: ${({ theme }) => theme.spacing[5]};
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.82;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral.cream};
`;
const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
`;
const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 5, 5, 0.02) 35%,
    rgba(5, 5, 5, 0.48) 100%
  );
  pointer-events: none;
`;
const ImageCaption = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[6]};
  bottom: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[4]};
  }
`;
const CaptionLine = styled.span`
  width: 36px;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold[300]};
`;
const CaptionText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.neutral.white};
`;
const FloatingMark = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 112px;
  height: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.brand.gold};
  color: ${({ theme }) => theme.colors.brand.black};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 78px;
    height: 78px;
  }
`;
const MarkText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 3.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.8;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;
const MarkSubtext = styled.span`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.6rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.2em;
`;
/* ========================================= CONTENT ========================================= */ const Content = styled.div`
  max-width: 580px;
`;
const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["4xl"]},
    5vw,
    ${({ theme }) => theme.fontSizes["6xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text.primary};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }
`;
const GoldLine = styled.div`
  width: 52px;
  height: 1px;
  margin: ${({ theme }) => theme.spacing[8]} 0;
  background: ${({ theme }) => theme.colors.brand.gold};
`;
const Description = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  &:last-of-type {
    margin-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;

// const ButtonWrapper = styled.div`
//   margin-top: ${({ theme }) => theme.spacing[8]};
//   button {
//     display: inline-flex;
//     align-items: center;
//     gap: ${({ theme }) => theme.spacing[3]};
//   }
//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     margin-top: ${({ theme }) => theme.spacing[6]};
//     button {
//       width: 100%;
//     }
//   }
// `;

const MotionSection = motion(Section);
const MotionImageWrapper = motion(ImageWrapper);
const MotionContent = motion(Content);
// const MotionDetail = motion(Details);
