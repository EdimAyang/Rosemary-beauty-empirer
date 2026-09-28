import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styled from "styled-components";

const luxuryEase = [0.22, 1, 0.36, 1] as const;
const sectionReveal = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};
const imageReveal = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: luxuryEase },
  },
};
const contentReveal = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};
const valuesReveal = {
  hidden: { opacity: 0, y: 25 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: index * 0.12, ease: luxuryEase },
  }),
};


const BrandExperience = () => {
  return (
    <MotionWrapper
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {" "}
      <MotionContent variants={sectionReveal}>
        {" "}
        <MotionContentColumn variants={contentReveal}>
          {" "}
          <Eyebrow>THE RBE EXPERIENCE</Eyebrow>{" "}
          <Heading>
            {" "}
            Beauty, <br /> <span>beyond the surface.</span>{" "}
          </Heading>{" "}
          <Description>
            {" "}
            We believe beauty is more than appearance. It is confidence,
            expression, and the way you carry yourself.{" "}
          </Description>{" "}
          <Description>
            {" "}
            At Rosemary Beauty Empire, every detail is thoughtfully curated to
            help you feel beautiful, confident, and completely yourself.{" "}
          </Description>{" "}
          <StoryLink href="#about">
            {" "}
            <Button $variant="outline">
              {" "}
              Discover our story{" "}
              <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
            </Button>{" "}
          </StoryLink>{" "}
        </MotionContentColumn>{" "}
        <ImageColumn>
          {" "}
          <MotionImageWrapper variants={imageReveal}>
            {" "}
            <ExperienceImage
              src="/images/brand/experience.jpg"
              alt="Rosemary Beauty Empire beauty experience"
            />{" "}
            <ImageLabel>
              {" "}
              <span>01</span> <p>Beauty with intention</p>{" "}
            </ImageLabel>{" "}
          </MotionImageWrapper>{" "}
          <DecorativeLine />{" "}
        </ImageColumn>{" "}
      </MotionContent>{" "}
      <MotionValues>
        {" "}
        {[
          {
            number: "01",
            title: "Quality",
            description:
              "Thoughtfully selected products and experiences made to meet a higher standard.",
          },
          {
            number: "02",
            title: "Expertise",
            description:
              "A beauty experience shaped by care, knowledge, and attention to detail.",
          },
          {
            number: "03",
            title: "Elegance",
            description:
              "Timeless beauty expressed through refined details and effortless confidence.",
          },
        ].map((value, index) => (
          <MotionValueItem
            key={value.number}
            custom={index}
            variants={valuesReveal}
          >
            {" "}
            <ValueNumber>{value.number}</ValueNumber>{" "}
            <div>
              {" "}
              <ValueTitle>{value.title}</ValueTitle>{" "}
              <ValueDescription> {value.description} </ValueDescription>{" "}
            </div>{" "}
          </MotionValueItem>
        ))}{" "}
      </MotionValues>{" "}
    </MotionWrapper>
  );
};
export default BrandExperience;

export const BrandExperienceWrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
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
/* ========================================================= MAIN CONTENT ========================================================= */ export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing[20]};
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: ${({ theme }) => theme.spacing[12]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
  }
`;
/* ========================================================= CONTENT COLUMN ========================================================= */ export const ContentColumn = styled.div`
  position: relative;
  max-width: 500px;
  padding-left: ${({ theme }) => theme.spacing[8]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 650px;
    padding-left: ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: ${({ theme }) => theme.spacing[4]};
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.colors.brand.gold};
    opacity: 0.65;
  }
`;
/* ========================================================= EYEBROW ========================================================= */ export const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.gold};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`;
/* ========================================================= HEADING ========================================================= */ export const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["5xl"]},
    7vw,
    ${({ theme }) => theme.fontSizes["7xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.88;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.text.primary};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["4xl"]},
      10vw,
      ${({ theme }) => theme.fontSizes["6xl"]}
    );
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["4xl"]},
      15vw,
      ${({ theme }) => theme.fontSizes["5xl"]}
    );
    line-height: 0.92;
  }
`;
/* ========================================================= DESCRIPTION ========================================================= */ export const Description = styled.p`
  max-width: 440px;
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  & + & {
    margin-top: ${({ theme }) => theme.spacing[4]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;
/* ========================================================= STORY LINK ========================================================= */ export const StoryLink = styled.a`
  display: inline-flex;
  margin-top: ${({ theme }) => theme.spacing[8]};
  text-decoration: none;
  button {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[6]};
  }
`;
/* ========================================================= IMAGE COLUMN ========================================================= */ export const ImageColumn = styled.div`
  position: relative;
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing[6]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: 0;
  }
`;
/* ========================================================= IMAGE ========================================================= */ export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.82;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral.cream};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 700px;
    aspect-ratio: 1 / 0.9;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 0.85;
  }
`;
export const ExperienceImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform ${({ theme }) => theme.transitions.slow};
  ${ImageWrapper}:hover & {
    transform: scale(1.025);
  }
`;
/* ========================================================= IMAGE LABEL ========================================================= */ export const ImageLabel = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[5]};
  bottom: ${({ theme }) => theme.spacing[5]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: ${({ theme }) => theme.colors.neutral.white};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[2]}
      ${({ theme }) => theme.spacing[3]};
  }
  span {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.brand.gold};
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }
  p {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: 0.04em;
  }
`;
/* ========================================================= DECORATIVE LINE ========================================================= */ export const DecorativeLine = styled.div`
  position: absolute;
  right: 0;
  bottom: -40px;
  width: 1px;
  height: 180px;
  background: ${({ theme }) => theme.colors.brand.gold};
  opacity: 0.6;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;
/* ========================================================= VALUES ========================================================= */ export const Values = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: ${({ theme }) => theme.spacing[24]} auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing[16]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    margin-top: ${({ theme }) => theme.spacing[12]};
  }
`;
/* ========================================================= VALUE ITEM ========================================================= */ export const ValueItem = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[8]}
    0;
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[6]}
      ${({ theme }) => theme.spacing[5]} 0;
    gap: ${({ theme }) => theme.spacing[4]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[6]} 0;
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
    &:last-child {
      border-bottom: 0;
    }
  }
`;
/* ========================================================= VALUE NUMBER ========================================================= */ export const ValueNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
/* ========================================================= VALUE TITLE ========================================================= */ export const ValueTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  color: ${({ theme }) => theme.colors.text.primary};
`;
/* ========================================================= VALUE DESCRIPTION ========================================================= */ export const ValueDescription = styled.p`
  max-width: 270px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`;


const MotionWrapper = motion(BrandExperienceWrapper);
const MotionContent = motion(Content);
const MotionContentColumn = motion(ContentColumn);
const MotionImageWrapper = motion(ImageWrapper);
const MotionValues = motion(Values);
const MotionValueItem = motion(ValueItem);