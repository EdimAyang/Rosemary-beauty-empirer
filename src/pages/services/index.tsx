import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarDays, Check, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Service2 } from "@/interface";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";
import { PATHS } from "@/router/paths";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { SliderButton, SliderControls } from "../shop";

const ITEMS_PER_SLIDE = 6;

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
};

type ServiceCategory = "All" | "Hair" | "Nails" | "Lashes" | "Makeup";

const services: Service2[] = [
  {
    id: "braiding",
    category: "Hair",
    title: "Braiding",
    description:
      "Beautifully styled braids created with attention to detail, comfort, and your preferred look.",
    image: "/images/services/hair.jpg",
    includes: [
      "Consultation",
      "Professional braiding",
      "Neat finishing",
      "Styling",
    ],
    price: "Contact for pricing",
  },
  {
    id: "bridal-hair",
    category: "Hair",
    title: "Bridal Hair",
    description:
      "Elegant bridal hairstyles designed to complement your dress, makeup, personality, and special day.",
    image: "/images/services/bridal-hair.jpg",
    includes: [
      "Style consultation",
      "Bridal styling",
      "Finishing",
      "Long-lasting hold",
    ],
    price: "Contact for pricing",
  },
  {
    id: "wig-installation",
    category: "Hair",
    title: "Wig Installation",
    description:
      "Professional wig installation tailored to create a seamless, polished, and natural-looking finish.",
    image: "/images/services/wig-installation.jpg",
    includes: [
      "Proper wig positioning",
      "Installation",
      "Styling",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "wig-revamping",
    category: "Hair",
    title: "Wig Revamping",
    description:
      "Give your existing wig a refreshed look with professional restoration, styling, and finishing.",
    image: "/images/services/wig-revamping.jpg",
    includes: ["Wig assessment", "Restoration", "Styling", "Finishing"],
    price: "Contact for pricing",
  },
  {
    id: "weaving",
    category: "Hair",
    title: "Weaving",
    description:
      "Neat and comfortable weaving services tailored to your preferred style and desired finish.",
    image: "/images/services/weaving.jpg",
    includes: [
      "Consultation",
      "Professional installation",
      "Styling",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "hair-treatment",
    category: "Hair",
    title: "Hair Treatment",
    description:
      "Intentional hair care treatments designed to help restore, nourish, and maintain healthy-looking hair.",
    image: "/images/services/hair-treatment.jpg",
    includes: ["Hair assessment", "Treatment", "Care guidance", "Finishing"],
    price: "Contact for pricing",
  },

  {
    id: "pedicure",
    category: "Nails",
    title: "Pedicure",
    description:
      "A refreshing foot-care experience designed to leave your feet polished, cared for, and beautiful.",
    image: "/images/services/pedicure.jpg",
    includes: ["Nail shaping", "Cuticle care", "Foot care", "Polish finish"],
    price: "Contact for pricing",
  },
  {
    id: "manicure",
    category: "Nails",
    title: "Manicure",
    description:
      "A refined nail-care experience focused on clean, polished, and beautifully maintained hands.",
    image: "/images/services/manicure.jpg",
    includes: ["Nail shaping", "Cuticle care", "Hand care", "Polish finish"],
    price: "Contact for pricing",
  },
  {
    id: "gel-polish",
    category: "Nails",
    title: "Gel Polish",
    description:
      "Long-lasting gel polish application for a glossy, elegant, and polished finish.",
    image: "/images/services/gel-polish.jpg",
    includes: ["Nail preparation", "Gel application", "Curing", "Finishing"],
    price: "Contact for pricing",
  },
  {
    id: "acrylic",
    category: "Nails",
    title: "Acrylic",
    description:
      "Beautifully structured acrylic nails designed around your preferred shape, length, and style.",
    image: "/images/services/acrylic.jpg",
    includes: [
      "Nail preparation",
      "Acrylic application",
      "Shape selection",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "nail-art",
    category: "Nails",
    title: "Nail Art",
    description:
      "Creative nail designs that add personality and a distinctive finishing touch to your look.",
    image: "/images/services/nail-art.jpg",
    includes: [
      "Design consultation",
      "Nail preparation",
      "Custom artwork",
      "Finishing",
    ],
    price: "Contact for pricing",
  },

  {
    id: "classic-lashes",
    category: "Lashes",
    title: "Classic Lashes",
    description:
      "A natural and elegant lash enhancement designed to define your eyes without feeling overdone.",
    image: "/images/services/lashes.jpg",
    includes: [
      "Lash consultation",
      "Classic application",
      "Styling",
      "Aftercare guidance",
    ],
    price: "Contact for pricing",
  },
  {
    id: "hybrid-lashes",
    category: "Lashes",
    title: "Hybrid Lashes",
    description:
      "A balanced combination of classic and volume techniques for a fuller yet beautifully natural look.",
    image: "/images/services/lashes.jpg",
    includes: [
      "Lash consultation",
      "Hybrid application",
      "Styling",
      "Aftercare guidance",
    ],
    price: "Contact for pricing",
  },
  {
    id: "volume-lashes",
    category: "Lashes",
    title: "Volume Lashes",
    description:
      "Fuller, more dramatic lashes designed to create a defined and glamorous eye look.",
    image: "/images/services/lashes.jpg",
    includes: [
      "Lash consultation",
      "Volume application",
      "Styling",
      "Aftercare guidance",
    ],
    price: "Contact for pricing",
  },
  {
    id: "lash-refill",
    category: "Lashes",
    title: "Lash Refill",
    description:
      "A maintenance service designed to refresh your existing lash extensions and restore their fullness.",
    image: "/images/services/lashes.jpg",
    includes: [
      "Lash assessment",
      "Refill application",
      "Styling",
      "Aftercare guidance",
    ],
    price: "Contact for pricing",
  },

  {
    id: "soft-glam",
    category: "Makeup",
    title: "Soft Glam",
    description:
      "A polished, sophisticated makeup look that enhances your natural features with a soft glamorous finish.",
    image: "/images/services/makeup.jpg",
    includes: ["Skin preparation", "Complexion", "Eye makeup", "Finishing"],
    price: "Contact for pricing",
  },
  {
    id: "full-glam",
    category: "Makeup",
    title: "Full Glam",
    description:
      "A statement makeup experience designed for clients who want a defined, elevated, and glamorous look.",
    image: "/images/services/makeup.jpg",
    includes: [
      "Skin preparation",
      "Full complexion",
      "Eye makeup",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "bridal-makeup",
    category: "Makeup",
    title: "Bridal Makeup",
    description:
      "Timeless bridal makeup thoughtfully created to photograph beautifully and last throughout your celebration.",
    image: "/images/services/bridal-makeup.jpg",
    includes: [
      "Bridal consultation",
      "Skin preparation",
      "Bridal makeup",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "event-makeup",
    category: "Makeup",
    title: "Event Makeup",
    description:
      "A beautifully tailored makeup look for birthdays, celebrations, dinners, parties, and special events.",
    image: "/images/services/event-makeup.jpg",
    includes: [
      "Consultation",
      "Skin preparation",
      "Makeup application",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
  {
    id: "photoshoot-makeup",
    category: "Makeup",
    title: "Photoshoot Makeup",
    description:
      "Camera-ready makeup designed to complement lighting, styling, photography, and your creative direction.",
    image: "/images/services/photoshoot-makeup.jpg",
    includes: [
      "Look consultation",
      "Skin preparation",
      "Camera-ready makeup",
      "Finishing",
    ],
    price: "Contact for pricing",
  },
];

const luxuryEase = [0.22, 1, 0.36, 1] as const;
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};
const cardReveal: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: luxuryEase },
  },
};

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") {
      return services;
    }
    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  const serviceSlides = useMemo(
    () => chunkItems(filteredServices, ITEMS_PER_SLIDE),
    [filteredServices],
  );

  // const categoryCount = (category: ServiceCategory) => {
  //   if (category === "All") {
  //     return services.length;
  //   }
  //   return services.filter((service) => service.category === category).length;
  // };

  return (
    <Page>
      {" "}
      <PageHero>
        <Navbar />

        <HeroImage
          src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1800&q=90"
          alt="Beauty products"
        />

        <HeroOverlay />

        <HeroContent
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={sectionReveal}
        >
          <HeroText>
            <HeroEyebrow>ROSEMARY BEAUTY EMPIRE</HeroEyebrow>

            <HeroTitle>
              Beauty <span>Services</span>
            </HeroTitle>

            <HeroDescription>
              Thoughtfully curated beauty experiences designed around your
              style, occasion, and individual expression.
            </HeroDescription>

            <HeroAction href="#services" whileHover={{ x: 6 }}>
              <span>Explore Services</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </HeroAction>
          </HeroText>
        </HeroContent>

        <HeroBottom>
          <HeroBottomText>HAIR · NAILS · LASHES · MAKEUP</HeroBottomText>

          <ScrollIndicator>
            <span />
            Explore
          </ScrollIndicator>
        </HeroBottom>
      </PageHero>
      <ServicesSection>
        {" "}
        <SectionIntro
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          {" "}
          <SectionEyebrow>WHAT WE OFFER</SectionEyebrow>{" "}
          <SectionTitle>
            {" "}
            Beauty, <span>beautifully tailored.</span>{" "}
          </SectionTitle>{" "}
          <SectionDescription>
            {" "}
            From hair and nails to lashes and makeup, every service is designed
            to help you look polished, feel confident, and enjoy the
            experience.{" "}
          </SectionDescription>{" "}
        </SectionIntro>{" "}
        <CategoryBar
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <CategoryLabel>EXPLORE SERVICES</CategoryLabel>

          <CategoryControls>
            <CategoryList>
              {(
                [
                  "All",
                  "Hair",
                  "Nails",
                  "Lashes",
                  "Makeup",
                ] as ServiceCategory[]
              ).map((category) => {
                const isActive = activeCategory === category;

                return (
                  <CategoryButton
                    key={category}
                    type="button"
                    $active={isActive}
                    onClick={() => setActiveCategory(category)}
                  >
                    <span>{category}</span>
                  </CategoryButton>
                );
              })}
            </CategoryList>

            {activeCategory !== "All" && (
              <ResetButton
                type="button"
                onClick={() => setActiveCategory("All")}
                aria-label="Reset service filter"
              >
                <span>Reset</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </ResetButton>
            )}
          </CategoryControls>
        </CategoryBar>
        <ServiceSliderWrapper>
          <Swiper
            key={activeCategory}
            modules={[Navigation]}
            navigation={{
              nextEl: ".services-next",
              prevEl: ".services-prev",
            }}
          >
            {serviceSlides.map((slide, slideIndex) => (
              <SwiperSlide key={`services-slide-${slideIndex}`}>
                <ServicesGrid
                  as={motion.div}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                >
                  {slide.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      as={motion.article}
                      variants={cardReveal}
                    >
                      <ServiceImageWrapper>
                        <ServiceImage
                          src={service.image}
                          alt={service.title}
                          loading={index < 4 ? "eager" : "lazy"}
                        />

                        <ServiceImageOverlay />

                        <ServiceNumber>
                          {String(slideIndex * 6 + index + 1).padStart(2, "0")}
                        </ServiceNumber>

                        <CategoryBadge>{service.category}</CategoryBadge>
                      </ServiceImageWrapper>

                      <ServiceContent>
                        <ServiceTop>
                          <ServiceTitle>{service.title}</ServiceTitle>

                          <ServiceArrow
                            aria-hidden="true"
                            size={20}
                            strokeWidth={1.5}
                          />
                        </ServiceTop>

                        <ServiceDescription>
                          {service.description}
                        </ServiceDescription>

                        <ServiceFooter>
                          <ServicePrice>{service.price}</ServicePrice>

                          <DetailsLink to={`/services/${service.id}`}>
                            View details
                            <ArrowRight size={15} strokeWidth={1.5} />
                          </DetailsLink>
                        </ServiceFooter>
                      </ServiceContent>
                    </ServiceCard>
                  ))}
                </ServicesGrid>
              </SwiperSlide>
            ))}
          </Swiper>

          {serviceSlides.length > 1 && (
            <SliderControls>
              <SliderButton
                type="button"
                className="services-prev"
                aria-label="Previous services"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </SliderButton>

              <SliderButton
                type="button"
                className="services-next"
                aria-label="Next services"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </SliderButton>
            </SliderControls>
          )}
        </ServiceSliderWrapper>
        {filteredServices.length === 0 && (
          <EmptyState>
            {" "}
            <p>No services found.</p>{" "}
            <Button
              type="button"
              $variant="outline"
              onClick={() => setActiveCategory("All")}
            >
              {" "}
              View all services{" "}
            </Button>{" "}
          </EmptyState>
        )}{" "}
      </ServicesSection>{" "}
      <ExperienceSection>
        {" "}
        <ExperienceImageWrapper>
          {" "}
          <ExperienceImage
            src="/images/services/service-experience.jpg"
            alt="Rosemary Beauty Empire beauty experience"
          />{" "}
          <ExperienceImageOverlay />{" "}
        </ExperienceImageWrapper>{" "}
        <ExperienceContent
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionReveal}
        >
          {" "}
          <SectionEyebrow>THE RBE EXPERIENCE</SectionEyebrow>{" "}
          <ExperienceTitle>
            {" "}
            More than a service. <span>It&apos;s a feeling.</span>{" "}
          </ExperienceTitle>{" "}
          <ExperienceText>
            {" "}
            Every RBE appointment is created with the belief that beauty should
            feel personal. From the first consultation to the final detail, our
            goal is to create an experience where you feel comfortable,
            confident, and beautifully cared for.{" "}
          </ExperienceText>{" "}
          <ExperiencePoints>
            {" "}
            <ExperiencePoint>
              {" "}
              <PointIcon>
                {" "}
                <Check size={15} />{" "}
              </PointIcon>{" "}
              <div>
                {" "}
                <strong>Professional Expertise</strong>{" "}
                <span>
                  {" "}
                  Thoughtful techniques and attention to detail.{" "}
                </span>{" "}
              </div>{" "}
            </ExperiencePoint>{" "}
            <ExperiencePoint>
              {" "}
              <PointIcon>
                {" "}
                <Check size={15} />{" "}
              </PointIcon>{" "}
              <div>
                {" "}
                <strong>Personalized Experience</strong>{" "}
                <span> Services tailored to your individual style. </span>{" "}
              </div>{" "}
            </ExperiencePoint>{" "}
            <ExperiencePoint>
              {" "}
              <PointIcon>
                {" "}
                <Check size={15} />{" "}
              </PointIcon>{" "}
              <div>
                {" "}
                <strong>Beautiful Results</strong>{" "}
                <span>
                  {" "}
                  Polished looks created with care and intention.{" "}
                </span>{" "}
              </div>{" "}
            </ExperiencePoint>{" "}
          </ExperiencePoints>{" "}
          <ButtonLink to={PATHS.BOOKING}>
            {" "}
            <Button $variant="primary" $fullWidth type="button" $size="sm">
              {" "}
              <CalendarDays size={17} /> Book an Appointment{" "}
            </Button>{" "}
          </ButtonLink>{" "}
        </ExperienceContent>{" "}
      </ExperienceSection>{" "}
      <BookingCTA>
        {" "}
        <CTAInner
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionReveal}
        >
          {" "}
          <CTAFlourish>RBE</CTAFlourish>{" "}
          <CTAEyebrow>YOUR BEAUTY MOMENT AWAITS</CTAEyebrow>{" "}
          <CTATitle>
            {" "}
            Ready to feel <span>beautifully you?</span>{" "}
          </CTATitle>{" "}
          <CTAText>
            {" "}
            Choose your service and let&apos;s create an experience designed
            around you.{" "}
          </CTAText>{" "}
          <CTAActions>
            {" "}
            <ButtonLink to={PATHS.BOOKING}>
              {" "}
              <Button $variant="primary" $fullWidth type="button" $size="sm">
                {" "}
                <CalendarDays size={17} /> Book an Appointment{" "}
              </Button>{" "}
            </ButtonLink>{" "}
            <Link
              to="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
            >
              <Button $variant="outline" $fullWidth type="button" $size="sm">
                <MessageCircle size={17} /> Chat on WhatsApp
              </Button>
            </Link>{" "}
          </CTAActions>{" "}
        </CTAInner>{" "}
      </BookingCTA>{" "}
      <Footer />
    </Page>
  );
};
export default ServicesPage;

const ServiceSliderWrapper = styled.div`
  position: relative;
  width: 100%;

  .swiper {
    width: 100%;
    overflow: hidden;
  }

  .swiper-slide {
    width: 100%;
  }
`;

const CategoryControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  }
`;

const ResetButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 0 15px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.pill};

  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;

  cursor: pointer;

  transition:
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    gap ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
    background: rgba(201, 162, 39, 0.06);
    gap: 10px;
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: rotate(-45deg);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PageHero = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 620px;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 72vh;
    min-height: 580px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 100vh;
    min-height: 560px;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center 45%;

  transform: scale(1.01);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    object-position: 58% center;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(17, 14, 12, 0.82) 0%,
      rgba(17, 14, 12, 0.58) 34%,
      rgba(17, 14, 12, 0.2) 70%,
      rgba(17, 14, 12, 0.1) 100%
    ),
    linear-gradient(
      0deg,
      rgba(17, 14, 12, 0.65) 0%,
      rgba(17, 14, 12, 0.05) 45%,
      rgba(17, 14, 12, 0.25) 100%
    );

  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background:
      linear-gradient(
        90deg,
        rgba(17, 14, 12, 0.72) 0%,
        rgba(17, 14, 12, 0.35) 100%
      ),
      linear-gradient(0deg, rgba(17, 14, 12, 0.72) 0%, transparent 65%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  width: min(${({ theme }) => theme.layout.contentWidth}, calc(100% - 80px));

  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  padding-top: 90px;
  padding-bottom: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 48px);
    padding-top: 100px;
    padding-bottom: 90px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - 32px);
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const HeroText = styled.div`
  width: 100%;
  max-width: 720px;

  color: ${({ theme }) => theme.colors.neutral.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const HeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 24px;

  color: ${({ theme }) => theme.colors.brand.gold};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    background: currentColor;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 18px;

    font-size: 0.55rem;
  }
`;

const HeroTitle = styled.h1`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(4rem, 8vw, 8.5rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.055em;

  color: ${({ theme }) => theme.colors.neutral.white};

  span {
    display: block;

    margin-left: 0.7em;

    color: ${({ theme }) => theme.colors.brand.gold};

    font-style: italic;
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(4rem, 10vw, 7rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(3.6rem, 17vw, 5.5rem);
    line-height: 0.9;

    span {
      margin-left: 0.35em;
    }
  }
`;

const HeroDescription = styled.p`
  max-width: 470px;

  margin: 30px 0 0;

  color: rgba(255, 255, 255, 0.76);

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 340px;

    margin-top: 24px;

    font-size: 0.78rem;
    line-height: 1.7;
  }
`;

const HeroAction = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-top: 32px;
  padding-bottom: 8px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.45);

  color: ${({ theme }) => theme.colors.neutral.white};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;

  transition:
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const HeroBottom = styled.div`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  left: 0;

  width: min(${({ theme }) => theme.layout.contentWidth}, calc(100% - 80px));

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 28px;

  color: rgba(255, 255, 255, 0.65);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 48px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - 32px);
    padding-bottom: 20px;
  }
`;

const HeroBottomText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.16em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.48rem;
    letter-spacing: 0.11em;
  }
`;

const ScrollIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: rgba(255, 255, 255, 0.7);

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  span {
    display: block;

    width: 34px;
    height: 1px;

    background: ${({ theme }) => theme.colors.brand.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.5rem;

    span {
      width: 24px;
    }
  }
`;

const ServicesSection = styled.section`
  width: min(${({ theme }) => theme.layout.contentWidth}, calc(100% - 80px));

  max-width: 100%;
  margin: 0 auto;
  padding: 120px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 48px);
    padding: 90px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - 32px);
    padding: 72px 0;
  }
`;

const SectionIntro = styled.div`
  max-width: 680px;
  margin-bottom: 65px;
`;
const SectionEyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.brand.gold};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;
const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.035em;
  span {
    display: block;
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
`;
const SectionDescription = styled.p`
  max-width: 570px;
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const CategoryBar = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};

  margin-bottom: 42px;
  padding-bottom: 18px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;
  }
`;

const CategoryLabel = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  min-width: 0;
  max-width: 100%;

  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding-bottom: 5px;
  }
`;

// const CategoryButton = styled.button<{ $active: boolean }>`
//   display: inline-flex;
//   align-items: center;
//   gap: 8px;
//   min-height: 40px;
//   padding: 0 15px;
//   border: 1px solid
//     ${({ $active, theme }) =>
//       $active ? theme.colors.brand.gold : theme.colors.border.light};
//   border-radius: ${({ theme }) => theme.radii.pill};
//   color: ${({ $active, theme }) =>
//     $active ? theme.colors.neutral.white : theme.colors.text.primary};
//   background: ${({ $active, theme }) =>
//     $active ? theme.colors.brand.gold : "transparent"};
//   white-space: nowrap;
//   cursor: pointer;
//   transition:
//     background ${({ theme }) => theme.transitions.normal},
//     color ${({ theme }) => theme.transitions.normal},
//     border ${({ theme }) => theme.transitions.normal};
//   span {
//     font-size: 0.75rem;
//     font-weight: 600;
//   }
//   small {
//     font-size: 0.6rem;
//     opacity: 0.65;
//   }
//   &:hover {
//     border-color: ${({ theme }) => theme.colors.brand.gold};
//     color: ${({ theme }) => theme.colors.neutral.white};
//     background: ${({ theme }) => theme.colors.brand.gold};
//   }
// `;

export const CategoryButton = styled.button<{
  $active: boolean;
}>`
  flex-shrink: 0;

  padding: 12px 22px;

  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  border-radius: 999px;

  background: ${({ $active }) => ($active ? "transparent" : "transparent")};

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 13px;

  cursor: pointer;

  transition:
    border-color 180ms ease,
    background 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
    transform: translateY(-1px);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
`;
const ServiceCard = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.card};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border ${({ theme }) => theme.transitions.normal};
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.gold[200]};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;
const ServiceImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 0.9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral.cream};
`;
const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
  ${ServiceCard}:hover & {
    transform: scale(1.045);
  }
`;
const ServiceImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.18) 0%,
    transparent 45%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;
const ServiceNumber = styled.span`
  position: absolute;
  top: 18px;
  left: 18px;
  color: ${({ theme }) => theme.colors.neutral.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.2rem;
`;
const CategoryBadge = styled.span`
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 7px 11px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.neutral.white};
  background: rgba(5, 5, 5, 0.45);
  backdrop-filter: blur(10px);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;
const ServiceContent = styled.div`
  padding: 25px 24px 22px;
`;
const ServiceTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;
const ServiceTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
`;
const ServiceArrow = styled(ArrowRight)`
  flex-shrink: 0;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.brand.gold};
  transition: transform ${({ theme }) => theme.transitions.normal};
  ${ServiceCard}:hover & {
    transform: translateX(5px);
  }
`;
const ServiceDescription = styled.p`
  min-height: 72px;
  margin: 16px 0 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.82rem;
  line-height: 1.65;
`;
const ServiceFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 17px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;
const ServicePrice = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.72rem;
  font-weight: 600;
`;
const DetailsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.brand.gold};
  font-size: 0.72rem;
  font-weight: 600;
  transition: gap ${({ theme }) => theme.transitions.fast};
  &:hover {
    gap: 10px;
  }
`;
const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  p {
    margin: 0 0 24px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
const ExperienceSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 650px;
  color: ${({ theme }) => theme.colors.neutral.white};
  background: ${({ theme }) => theme.colors.brand.black};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
const ExperienceImageWrapper = styled.div`
  position: relative;
  min-height: 620px;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 480px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 380px;
  }
`;
const ExperienceImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;
const ExperienceImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 55%, rgba(5, 5, 5, 0.5)),
    linear-gradient(180deg, transparent 60%, rgba(5, 5, 5, 0.35));
`;
const ExperienceContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px clamp(35px, 7vw, 110px);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 70px 24px;
  }
`;
const ExperienceTitle = styled.h2`
  max-width: 500px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.035em;
  span {
    display: block;
    color: ${({ theme }) => theme.colors.gold[300]};
    font-style: italic;
  }
`;
const ExperienceText = styled.p`
  max-width: 530px;
  margin: 30px 0 38px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.9rem;
  line-height: 1.8;
`;
const ExperiencePoints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 38px;
`;
const ExperiencePoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 13px;
  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  strong {
    color: ${({ theme }) => theme.colors.neutral.white};
    font-size: 0.78rem;
    font-weight: 600;
  }
  span {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.72rem;
    line-height: 1.5;
  }
`;
const PointIcon = styled.span`
  width: 25px;
  height: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const ButtonLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
  .sc-bdfBwQ,
  button {
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }
`;
const BookingCTA = styled.section`
  position: relative;
  overflow: hidden;
  padding: 130px 24px;
  background: ${({ theme }) => theme.colors.neutral.cream};
  text-align: center;
  &::before {
    content: "";
    position: absolute;
    width: 420px;
    height: 420px;
    top: -230px;
    left: -180px;
    border: 1px solid ${({ theme }) => theme.colors.gold[300]};
    border-radius: 50%;
    opacity: 0.45;
  }
  &::after {
    content: "";
    position: absolute;
    width: 360px;
    height: 360px;
    right: -190px;
    bottom: -210px;
    border: 1px solid ${({ theme }) => theme.colors.gold[300]};
    border-radius: 50%;
    opacity: 0.45;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 90px 20px;
  }
`;
const CTAInner = styled.div`
  position: relative;
  z-index: 2;
  width: min(760px, 100%);
  margin: 0 auto;
`;
const CTAFlourish = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.brand.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
`;
const CTAEyebrow = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.brand.gold};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;
const CTATitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.2rem, 6vw, 6rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.04em;
  span {
    display: block;
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
`;
const CTAText = styled.p`
  max-width: 500px;
  margin: 25px auto 32px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.7;
`;
const CTAActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    > * {
      width: 100%;
      justify-content: center;
    }
  }
`;
