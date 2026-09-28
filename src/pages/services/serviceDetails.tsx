import { Button } from "@/components/ui/Button";
import { PATHS } from "@/router/paths";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MessageCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ServiceDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  image: string;
  benefits: string[];
  experience: string;
}

const services: ServiceDetail[] = [
  {
    id: "facial",
    name: "Signature Facial",
    category: "FACIAL TREATMENTS",
    description:
      "A deeply restorative facial ritual designed to cleanse, hydrate and bring your natural glow back to life.",
    longDescription:
      "Our Signature Facial is a carefully curated treatment designed to give your skin the attention it deserves. The experience combines deep cleansing, gentle exfoliation, nourishing hydration and a relaxing facial massage to leave your skin looking fresh, smooth and beautifully refreshed.",
    duration: "60 minutes",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=90",
    benefits: [
      "Deeply cleanses the skin",
      "Removes dead skin cells",
      "Restores moisture",
      "Improves skin radiance",
      "Relaxing facial massage",
    ],
    experience:
      "Perfect when your skin feels tired, dull or dehydrated and you simply need time to reset.",
  },

  {
    id: "massage",
    name: "Relaxation Massage",
    category: "BODY TREATMENTS",
    description:
      "A calming full-body massage created to release tension and leave you feeling completely restored.",
    longDescription:
      "Slow down and reconnect with yourself. Our Relaxation Massage uses flowing massage techniques and carefully selected oils to release everyday tension while encouraging a deep sense of calm and relaxation.",
    duration: "60 minutes",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=90",
    benefits: [
      "Relieves muscle tension",
      "Encourages relaxation",
      "Promotes circulation",
      "Helps reduce everyday stress",
      "Leaves the body feeling refreshed",
    ],
    experience:
      "Ideal for anyone who needs to slow down, release tension and enjoy an uninterrupted moment of calm.",
  },

  {
    id: "manicure",
    name: "Luxury Manicure",
    category: "NAIL CARE",
    description:
      "A complete nail-care experience with careful shaping, cuticle care and a beautiful polished finish.",
    longDescription:
      "Our Luxury Manicure brings together detailed nail care and a relaxing hand ritual. Your nails are carefully shaped and refined while your hands receive exfoliation, hydration and massage before the final finish.",
    duration: "45 minutes",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=90",
    benefits: [
      "Professional nail shaping",
      "Cuticle care",
      "Hand exfoliation",
      "Deep hydration",
      "Relaxing hand massage",
    ],
    experience:
      "A beautiful self-care ritual for keeping your hands and nails looking polished and cared for.",
  },

  {
    id: "pedicure",
    name: "Luxury Pedicure",
    category: "NAIL CARE",
    description:
      "A relaxing foot-care ritual combining exfoliation, hydration and professional nail care.",
    longDescription:
      "Give your feet the attention they deserve with our Luxury Pedicure. The treatment combines detailed nail care with exfoliation, hydration and a soothing massage for an experience that feels as good as it looks.",
    duration: "60 minutes",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1400&q=90",
    benefits: [
      "Professional nail shaping",
      "Cuticle care",
      "Foot exfoliation",
      "Deep moisturising",
      "Relaxing foot massage",
    ],
    experience:
      "Perfect after a long week when your feet need some extra care and attention.",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return (
      <NotFound>
        <h1>Service not found</h1>

        <p style={{ marginBottom: "2rem" }}>
          The service you're looking for doesn't exist.
        </p>

        <Button
          type="button"
          $fullWidth
          $size="sm"
          $variant="outline"
          onClick={() => navigate(PATHS.SERVICE)}
        >
          <ArrowLeft size={16} />
          Back to services
        </Button>
      </NotFound>
    );
  }

  return (
    <DetailContainer>
      <BackButton type="button" onClick={() => navigate("/services")}>
        <ArrowLeft size={17} />
        Back to services
      </BackButton>

      <DetailGrid>
        <DetailImageWrapper>
          <DetailImage src={service.image} alt={service.name} />
        </DetailImageWrapper>

        <DetailContent>
          <DetailIntro>
            <DetailLabel>{service.category}</DetailLabel>

            <DetailTitle>{service.name}</DetailTitle>

            <Description>{service.description}</Description>
          </DetailIntro>

          <InfoGrid>
            <InfoItem>
              <Clock3 size={17} />

              <div>
                <InfoLabel>Duration</InfoLabel>

                <InfoValue>{service.duration}</InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <MessageCircle size={17} />

              <div>
                <InfoLabel>Investment</InfoLabel>

                <InfoValue>{formatPrice(service.price)}</InfoValue>
              </div>
            </InfoItem>
          </InfoGrid>

          <BookingButton
            type="button"
            onClick={() => navigate(`/booking?service=${service.id}`)}
          >
            Book this treatment
            <ArrowRight size={17} />
          </BookingButton>

          <Description>{service.longDescription}</Description>

          <div>
            <DetailLabel>WHAT'S INCLUDED</DetailLabel>

            <FeatureList>
              {service.benefits.map((benefit) => (
                <FeatureItem key={benefit}>
                  <Check size={15} />

                  <span>{benefit}</span>
                </FeatureItem>
              ))}
            </FeatureList>
          </div>

          <div>
            <DetailLabel>THE EXPERIENCE</DetailLabel>

            <Description>{service.experience}</Description>
          </div>
        </DetailContent>
      </DetailGrid>
    </DetailContainer>
  );
};

export default ServiceDetails;

import styled from "styled-components";

export const DetailContainer = styled.main`
  width: min(1250px, calc(100% - 80px));

  margin: 0 auto;

  padding: 45px 0 140px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);

    padding: 30px 0 90px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0;
  margin-bottom: 60px;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;

  cursor: pointer;
`;

export const DetailGrid = styled.div`
  display: grid;

  grid-template-columns: minmax(0, 1fr) minmax(380px, 0.8fr);

  gap: 80px;

  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    gap: 50px;
  }
`;

export const DetailImageWrapper = styled.div`
  width: 100%;

  height: min(720px, 75vh);

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.darkSoft || "#f2efeb"};

  @media (max-width: 1000px) {
    height: 65vw;
    min-height: 420px;
  }

  @media (max-width: 600px) {
    height: 115vw;
    min-height: 400px;
  }
`;

export const DetailImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 34px;

  padding-top: 20px;
`;

export const DetailIntro = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.span`
  display: block;

  margin-bottom: 14px;

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.18em;
`;

export const DetailTitle = styled.h1`
  margin: 0;

  font-size: clamp(42px, 5vw, 68px);

  font-weight: 400;

  line-height: 0.98;

  letter-spacing: -0.055em;
`;

export const Description = styled.p`
  max-width: 580px;

  margin: 18px 0 0;

  font-size: 13px;

  line-height: 1.9;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const InfoGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 12px;

  padding: 20px 0;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  svg {
    flex-shrink: 0;
  }
`;

export const InfoLabel = styled.span`
  display: block;

  margin-bottom: 4px;

  font-size: 9px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};

  text-transform: uppercase;

  letter-spacing: 0.08em;
`;

export const InfoValue = styled.strong`
  display: block;

  font-size: 13px;

  font-weight: 500;
`;

export const BookingButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 17px 22px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: ${({ theme }) => theme.colors.text.primary};

  color: ${({ theme }) => theme.colors.background?.primary || "#fff"};

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: all 180ms ease;

  &:hover {
    background: transparent;

    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 13px;

  margin-top: 20px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;

  gap: 11px;

  font-size: 12px;

  svg {
    flex-shrink: 0;
  }
`;

export const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 25px;

  padding: 13px 20px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;

  cursor: pointer;
`;

export const NotFound = styled.main`
  min-height: 65vh;
  max-width: 50vw;
  margin:0 auto;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 40px;

  h1 {
    margin: 0;

    font-size: 42px;
    font-weight: 400;
  }

  p {
    margin: 15px 0 0;

    font-size: 13px;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;
