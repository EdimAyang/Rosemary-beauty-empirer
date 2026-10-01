import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/interface";
import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";

const services: Service[] = [
  {
    id: "makeup",
    number: "01",
    title: "Makeup Artistry",
    description:
      "From soft glam to statement looks, our makeup services are designed to complement your natural beauty and make every occasion memorable.",
    image: "/images/services/makeup.jpg",
  },
  {
    id: "hair",
    number: "02",
    title: "Hair Styling",
    description:
      "Polished, expressive hairstyles carefully created to complete your look and suit your personality, occasion, and style.",
    image: "/images/services/hair.jpg",
  },
  {
    id: "treatments",
    number: "03",
    title: "Beauty Treatments",
    description:
      "Intentional beauty treatments focused on helping you look refreshed, feel confident, and enjoy a moment of self-care.",
    image: "/images/services/treatments.jpg",
  },
  {
    id: "occasion",
    number: "04",
    title: "Special Occasion",
    description:
      "A complete beauty experience for weddings, celebrations, photoshoots, and moments where every detail matters.",
    image: "/images/services/occasion.jpg",
  },
];

const luxuryEase = [0.22, 1, 0.36, 1] as const;
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

const headingReveal: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

const listReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: luxuryEase },
  },
};

const Services = () => {
  const [activeService, setActiveService] = useState(services[0].id);
  const activeItem =
    services.find((service) => service.id === activeService) ?? services[0];

  const navigate = useNavigate();
  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
    >
      {" "}
      <MotionHeader variants={headingReveal}>
        {" "}
        <HeaderContent>
          {" "}
          <Eyebrow>OUR SERVICES</Eyebrow>{" "}
          <Heading>
            {" "}
            Beauty services, <br /> <span>refined around you.</span>{" "}
          </Heading>{" "}
        </HeaderContent>{" "}
        <HeaderDescription>
          {" "}
          From everyday beauty to unforgettable occasions, every service is
          thoughtfully designed around you.{" "}
        </HeaderDescription>{" "}
      </MotionHeader>{" "}
      <ServicesLayout>
        {" "}
        <MotionServiceList variants={listReveal}>
          {" "}
          {services.map((service) => {
            const isActive = activeService === service.id;
            return (
              <MotionServiceItem
                key={service.id}
                $active={isActive}
                onMouseEnter={() => setActiveService(service.id)}
                onFocus={() => setActiveService(service.id)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: luxuryEase },
                  },
                }}
              >
                {" "}
                <ServiceButton
                  type="button"
                  onClick={() => setActiveService(service.id)}
                  aria-expanded={isActive}
                >
                  {" "}
                  <ServiceNumber>{service.number}</ServiceNumber>{" "}
                  <ServiceInfo>
                    {" "}
                    <ServiceTitle $active={isActive}>
                      {" "}
                      {service.title}{" "}
                    </ServiceTitle>{" "}
                    <ServiceDescription $active={isActive}>
                      {" "}
                      {service.description}{" "}
                    </ServiceDescription>{" "}
                  </ServiceInfo>{" "}
                  <ServiceArrow $active={isActive}>
                    {" "}
                    <ArrowUpRight size={20} strokeWidth={1.4} />{" "}
                  </ServiceArrow>{" "}
                </ServiceButton>{" "}
              </MotionServiceItem>
            );
          })}{" "}
        </MotionServiceList>{" "}
        <PreviewColumn>
          {" "}
          <MotionPreview
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: luxuryEase }}
          >
            {" "}
            <PreviewImage src={activeItem.image} alt={activeItem.title} />{" "}
            <PreviewOverlay />{" "}
            <PreviewContent>
              {" "}
              <PreviewNumber>{activeItem.number}</PreviewNumber>{" "}
              <PreviewTitle> {activeItem.title} </PreviewTitle>{" "}
              <PreviewLink href={PATHS.BOOKING}>
                {" "}
                Book a service <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
              </PreviewLink>{" "}
            </PreviewContent>{" "}
          </MotionPreview>{" "}
        </PreviewColumn>{" "}
      </ServicesLayout>{" "}
      <BottomAction>
        {" "}
        <Button
          $variant="outline"
          $size="md"
          onClick={() => navigate(PATHS.SERVICE)}
        >
          {" "}
          Explore all services <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
        </Button>{" "}
      </BottomAction>{" "}
    </MotionSection>
  );
};
export default Services;

const Section = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[32]}
    ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background.secondary};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[24]}
      ${({ theme }) => theme.spacing[6]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[20]}
      ${({ theme }) => theme.spacing[4]};
  }
`;

const SectionHeader = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto ${({ theme }) => theme.spacing[16]};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing[12]};
    gap: ${({ theme }) => theme.spacing[8]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing[10]};
    gap: ${({ theme }) => theme.spacing[5]};
  }
`;
const HeaderContent = styled.div`
  min-width: 0;
`;
const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
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
    6vw,
    ${({ theme }) => theme.fontSizes["6xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.9;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.text.primary};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes["3xl"]},
      13vw,
      ${({ theme }) => theme.fontSizes["5xl"]}
    );
  }
`;
const HeaderDescription = styled.p`
  max-width: 360px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
/* ========================================================= SERVICES LAYOUT ========================================================= */ const ServicesLayout = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.85fr);
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: stretch;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.85fr);
    gap: ${({ theme }) => theme.spacing[10]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[10]};
  }
`;
/* ========================================================= SERVICE LIST ========================================================= */ const ServiceList = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.medium};
`;
/* ========================================================= SERVICE ITEM ========================================================= */ const ServiceItem = styled.div<{
  $active?: boolean;
}>`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.medium};
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.45)" : "transparent"};
  transition: background ${({ theme }) => theme.transitions.normal};
  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.45);
    }
  }
`;
const ServiceButton = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[3]};
  border: 0;
  background: transparent;
  text-align: left;
  color: inherit;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 42px minmax(0, 1fr) auto;
    gap: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[6]}
      ${({ theme }) => theme.spacing[2]};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: -2px;
  }
`;
const ServiceNumber = styled.span`
  align-self: start;
  padding-top: 5px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const ServiceInfo = styled.div`
  min-width: 0;
`;
const ServiceTitle = styled.h3<{ $active?: boolean }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["2xl"]},
    3vw,
    ${({ theme }) => theme.fontSizes["4xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand.gold : theme.colors.text.primary};
  transition: color ${({ theme }) => theme.transitions.normal};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }
`;
const ServiceDescription = styled.p<{ $active?: boolean }>`
  max-width: 520px;
  margin: ${({ theme }) => theme.spacing[3]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: opacity ${({ theme }) => theme.transitions.normal};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`;
const ServiceArrow = styled.span<{ $active?: boolean }>`
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.brand.gold : theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand.gold : theme.colors.text.primary};
  transform: ${({ $active }) => ($active ? "rotate(0deg)" : "rotate(0deg)")};
  transition:
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.normal};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
  ${ServiceItem}:hover & {
    border-color: ${({ theme }) => theme.colors.brand.gold};
    color: ${({ theme }) => theme.colors.brand.gold};
    transform: translate(2px, -2px);
  }
`;
/* ========================================================= PREVIEW ========================================================= */ const PreviewColumn = styled.div`
  position: relative;
  min-width: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
const Preview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 580px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black[800]};
`;
const PreviewImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
const PreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 5, 5, 0.05) 20%,
    rgba(5, 5, 5, 0.2) 45%,
    rgba(5, 5, 5, 0.82) 100%
  );
  pointer-events: none;
`;
const PreviewContent = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[8]};
  bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.neutral.white};
`;
const PreviewNumber = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const PreviewTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["3xl"]},
    4vw,
    ${({ theme }) => theme.fontSizes["5xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 0.95;
  letter-spacing: -0.025em;
`;
const PreviewLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.brand.gold};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.neutral.white};
  text-decoration: none;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    gap ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    gap: ${({ theme }) => theme.spacing[5]};
  }
`;
/* ========================================================= BOTTOM ACTION ========================================================= */ const BottomAction = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: ${({ theme }) => theme.spacing[12]} auto 0;
  display: flex;
  justify-content: flex-end;
  button {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-start;
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;

const MotionSection = motion(Section);
const MotionHeader = motion(SectionHeader);
const MotionServiceList = motion(ServiceList);
const MotionServiceItem = motion(ServiceItem);
const MotionPreview = motion(Preview);
