import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import styled from "styled-components";
import type { Testimonial } from "@/interface";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amaka E.",
    role: "Client",
    avatar: "/images/testimonials/amaka.jpg",
    quote:
      "The entire experience felt so personal. From the service itself to the smallest details, everything was beautifully done. I left feeling confident, refreshed, and completely myself.",
    rating: 5,
  },
  {
    id: 2,
    name: "Blessing O.",
    role: "Client",
    avatar: "/images/testimonials/blessing.jpg",
    quote:
      "RBE has become my go-to beauty destination. The attention to detail is incredible, and you can genuinely feel the care that goes into every service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Diana A.",
    role: "Client",
    avatar: "/images/testimonials/diana.jpg",
    quote:
      "I booked for a special occasion and the result exceeded my expectations. Everything looked elegant, polished, and exactly like what I had imagined.",
    rating: 5,
  },
  {
    id: 4,
    name: "Esther M.",
    role: "Client",
    avatar: "/images/testimonials/esther.jpg",
    quote:
      "What I love most about RBE is how effortless the experience feels. You feel listened to, cared for, and beautifully looked after from beginning to end.",
    rating: 5,
  },
];

const luxuryEase = [0.22, 1, 0.36, 1] as const;
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};
const headingReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  const previousTestimonial = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  };
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);
  return (
    <MotionSection
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
    >
      {" "}
      <SectionInner>
        {" "}
        <MotionHeader variants={headingReveal}>
          {" "}
          <HeaderLeft>
            {" "}
            <Eyebrow>CLIENT STORIES</Eyebrow>{" "}
            <Heading>
              {" "}
              Loved for the <br /> <span>experience.</span>{" "}
            </Heading>{" "}
          </HeaderLeft>{" "}
          <HeaderDescription>
            {" "}
            Beautiful results are only part of the experience. Here is what some
            of our clients have to say about their time with RBE.{" "}
          </HeaderDescription>{" "}
        </MotionHeader>{" "}
        <TestimonialStage>
          {" "}
          <DecorativeQuote>
            {" "}
            <Quote size={42} strokeWidth={1} />{" "}
          </DecorativeQuote>{" "}
          <TestimonialMain>
            {" "}
            <AnimatePresence mode="wait">
              {" "}
              <MotionTestimonial
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
              >
                {" "}
                <Stars
                  aria-label={`${activeTestimonial.rating} out of 5 stars`}
                >
                  {" "}
                  {Array.from({ length: activeTestimonial.rating }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        strokeWidth={1.4}
                        fill="currentColor"
                      />
                    ),
                  )}{" "}
                </Stars>{" "}
                <QuoteText> “{activeTestimonial.quote}” </QuoteText>{" "}
                <ClientInfo>
                  {" "}
                  <ClientAvatar>
                    <AvatarImage
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                    />
                  </ClientAvatar>
                  <ClientDetails>
                    {" "}
                    <ClientName>{activeTestimonial.name}</ClientName>{" "}
                    <ClientRole>{activeTestimonial.role}</ClientRole>{" "}
                  </ClientDetails>{" "}
                </ClientInfo>{" "}
              </MotionTestimonial>{" "}
            </AnimatePresence>{" "}
          </TestimonialMain>{" "}
          <Controls>
            {" "}
            <Progress>
              {" "}
              <ProgressCurrent>
                {" "}
                {String(activeIndex + 1).padStart(2, "0")}{" "}
              </ProgressCurrent>{" "}
              <ProgressLine>
                {" "}
                <ProgressFill
                  $progress={((activeIndex + 1) / testimonials.length) * 100}
                />{" "}
              </ProgressLine>{" "}
              <ProgressTotal>
                {" "}
                {String(testimonials.length).padStart(2, "0")}{" "}
              </ProgressTotal>{" "}
            </Progress>{" "}
            <Navigation>
              {" "}
              <NavigationButton
                type="button"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
              >
                {" "}
                <ArrowLeft size={18} strokeWidth={1.4} />{" "}
              </NavigationButton>{" "}
              <NavigationButton
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                {" "}
                <ArrowRight size={18} strokeWidth={1.4} />{" "}
              </NavigationButton>{" "}
            </Navigation>{" "}
          </Controls>{" "}
        </TestimonialStage>{" "}
        <TestimonialIndicators>
          {" "}
          {testimonials.map((testimonial, index) => (
            <IndicatorButton
              key={testimonial.id}
              type="button"
              $active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              {" "}
              <span />{" "}
            </IndicatorButton>
          ))}{" "}
        </TestimonialIndicators>{" "}
      </SectionInner>{" "}
    </MotionSection>
  );
};
export default Testimonials;

/* ========================================= SECTION ========================================= */

const ClientAvatar = styled.div`
  position: relative;
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.neutral.cream};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 52px;
    height: 52px;
  }
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.inverse};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[24]}
      ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[4]};
  }
`;
const SectionInner = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
`;
/* ========================================= HEADER ========================================= */ const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
    margin-bottom: ${({ theme }) => theme.spacing[12]};
  }
`;
const HeaderLeft = styled.div``;
const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold[300]};
`;
const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["4xl"]},
    6vw,
    ${({ theme }) => theme.fontSizes["6xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral.white};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }
`;
const HeaderDescription = styled.p`
  max-width: 430px;
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: rgba(250, 248, 242, 0.6);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
/* ========================================= TESTIMONIAL STAGE ========================================= */ const TestimonialStage = styled.div`
  position: relative;
  min-height: 480px;
  padding: ${({ theme }) => theme.spacing[16]}
    ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[10]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(201, 162, 39, 0.08),
      transparent 30%
    ),
    ${({ theme }) => theme.colors.background.darkSoft};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 440px;
    padding: ${({ theme }) => theme.spacing[12]}
      ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[8]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 500px;
    padding: ${({ theme }) => theme.spacing[10]}
      ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  }
`;
const DecorativeQuote = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[10]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.brand.gold};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.spacing[5]};
    right: ${({ theme }) => theme.spacing[5]};
    width: 52px;
    height: 52px;
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;
const TestimonialMain = styled.div`
  max-width: 850px;
  min-height: 315px;
  display: flex;
  align-items: center;
`;
const TestimonialContent = styled.div`
  width: 100%;
`;
const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const QuoteText = styled.blockquote`
  max-width: 850px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["2xl"]},
    3.2vw,
    ${({ theme }) => theme.fontSizes["4xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.colors.neutral.ivory};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    line-height: 1.3;
  }
`;
const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
`;
// const ClientAvatar = styled.div`
//   width: 48px;
//   height: 48px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
//   border: 1px solid ${({ theme }) => theme.colors.brand.gold};
//   border-radius: ${({ theme }) => theme.radii.pill};
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-size: ${({ theme }) => theme.fontSizes.xs};
//   font-weight: ${({ theme }) => theme.fontWeights.semibold};
//   letter-spacing: 0.04em;
//   color: ${({ theme }) => theme.colors.brand.gold};
// `;


const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const ClientName = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral.white};
`;
const ClientRole = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;
/* ========================================= CONTROLS ========================================= */ const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing[10]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.dark};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;
const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;
const ProgressCurrent = styled.span`
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const ProgressTotal = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
`;
const ProgressLine = styled.span`
  position: relative;
  display: block;
  width: 80px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.dark};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
  }
`;
const ProgressFill = styled.span<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $progress }) => $progress}%;
  height: 1px;
  background: ${({ theme }) => theme.colors.brand.gold};
  transition: width ${({ theme }) => theme.transitions.normal};
`;
const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;
const NavigationButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
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
/* ========================================= MOBILE INDICATORS ========================================= */ const TestimonialIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;
const IndicatorButton = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "28px" : "8px")};
  height: 3px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  span {
    display: block;
    width: 100%;
    height: 100%;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.brand.gold : theme.colors.border.dark};
    transition:
      width ${({ theme }) => theme.transitions.normal},
      background ${({ theme }) => theme.transitions.normal};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 4px;
  }
`;

const MotionSection = motion(Section);
const MotionHeader = motion(SectionHeader);
const MotionTestimonial = motion(TestimonialContent);
