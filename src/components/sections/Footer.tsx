import { SOCIAL_LINKS, TELEPHONE } from "@/lib/constants";
import { InstagramIcon } from "@/lib/icons/instagram";
import { TiktokIcon } from "@/lib/icons/Tiktok";
import { PATHS } from "@/router/paths";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import styled from "styled-components";
const Footer = () => {
  return (
    <FooterWrapper>
      {" "}
      <FooterInner>
        {" "}
        {/* ========================================= TOP ========================================= */}{" "}
        <FooterTop>
          {" "}
          <BrandColumn>
            {" "}
            <BrandLogo>RBE</BrandLogo>{" "}
            <BrandStatement>
              {" "}
              Beauty, <br /> <span>redefined.</span>{" "}
            </BrandStatement>{" "}
            <BrandDescription>
              {" "}
              Thoughtful beauty experiences, timeless elegance, and products
              created to help you feel beautifully you.{" "}
            </BrandDescription>{" "}
          </BrandColumn>{" "}
          <NavigationColumn>
            {" "}
            <ColumnTitle>Explore</ColumnTitle>{" "}
            <FooterLinks>
              {" "}
              <FooterLink href={PATHS.HOME}>Home</FooterLink>{" "}
              <FooterLink href="#about">About</FooterLink>{" "}
              <FooterLink href={PATHS.SERVICE}>Services</FooterLink>{" "}
              <FooterLink href="#testimonials">Testimonials</FooterLink>{" "}
            </FooterLinks>{" "}
          </NavigationColumn>{" "}
          <NavigationColumn>
            {" "}
            <ColumnTitle>Discover</ColumnTitle>{" "}
            <FooterLinks>
              {" "}
              <FooterLink href={PATHS.SHOP}>Shop Collection</FooterLink>{" "}
              <FooterLink href={PATHS.BOOKING}>Book a Service</FooterLink>{" "}
              {/* <FooterLink href="#contact">Contact Us</FooterLink>{" "} */}
            </FooterLinks>{" "}
          </NavigationColumn>{" "}
          <ContactColumn>
            {" "}
            <ColumnTitle>Connect</ColumnTitle>{" "}
            <ContactLinks>
              {" "}
              <ContactLink href={TELEPHONE}>
                {" "}
                <ContactIcon>
                  {" "}
                  <Phone size={15} strokeWidth={1.5} />{" "}
                </ContactIcon>{" "}
                <span>{TELEPHONE}</span>{" "}
              </ContactLink>{" "}
              <ContactLink href="mailto:hello@rosemarybeautyempire.com">
                {" "}
                <ContactIcon>
                  {" "}
                  <Mail size={15} strokeWidth={1.5} />{" "}
                </ContactIcon>{" "}
                <span>hello@rosemarybeautyempire.com</span>{" "}
              </ContactLink>{" "}
            </ContactLinks>{" "}
            <SocialLinks>
              {" "}
              <SocialLink href={SOCIAL_LINKS.INSTAGRAM} aria-label="Instagram">
                {" "}
                <InstagramIcon />
              </SocialLink>{" "}
              <SocialLink href={SOCIAL_LINKS.TIKTOK} aria-label="Tiktok">
                {" "}
                <TiktokIcon />
              </SocialLink>{" "}
            </SocialLinks>{" "}
          </ContactColumn>{" "}
        </FooterTop>{" "}
        {/* ========================================= NEWSLETTER / CTA ========================================= */}{" "}
        <FooterMiddle>
          {" "}
          <NewsletterText>
            {" "}
            <NewsletterEyebrow>STAY IN THE KNOW</NewsletterEyebrow>{" "}
            <NewsletterHeading>
              {" "}
              Beauty inspiration, <br /> <span>delivered.</span>{" "}
            </NewsletterHeading>{" "}
          </NewsletterText>{" "}
          <NewsletterLink href="#newsletter">
            {" "}
            Join our community <ArrowUpRight size={18} strokeWidth={1.5} />{" "}
          </NewsletterLink>{" "}
        </FooterMiddle>{" "}
        {/* ========================================= BOTTOM ========================================= */}{" "}
        <FooterBottom>
          {" "}
          <Copyright>
            {" "}
            © {new Date().getFullYear()} Rosemary Beauty Empire. All rights
            reserved.{" "}
          </Copyright>{" "}
          <BottomLinks>
            {" "}
            <BottomLink href="#privacy">Privacy Policy</BottomLink>{" "}
            <BottomLink href="#terms">Terms & Conditions</BottomLink>{" "}
          </BottomLinks>{" "}
          {/* <BackToTop href="#home" aria-label="Back to top">
            {" "}
            <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
          </BackToTop>{" "} */}
        </FooterBottom>{" "}
      </FooterInner>{" "}
    </FooterWrapper>
  );
};
export default Footer;
/* ========================================= FOOTER ========================================= */ const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[20]}
    ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.brand.black};
  color: ${({ theme }) => theme.colors.neutral.white};
  border-top: 1px solid ${({ theme }) => theme.colors.border.dark};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[16]}
      ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[5]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[12]}
      ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  }
`;
const FooterInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
`;
/* ========================================= TOP ========================================= */ const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 0.7fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  padding-bottom: ${({ theme }) => theme.spacing[20]};
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1.4fr 0.8fr 0.8fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing[10]};
    padding-bottom: ${({ theme }) => theme.spacing[16]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[10]};
  }
`;
/* ========================================= BRAND ========================================= */ const BrandColumn = styled.div`
  max-width: 400px;
`;
const BrandLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const BrandStatement = styled.h2`
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
  color: ${({ theme }) => theme.colors.neutral.white};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
`;
const BrandDescription = styled.p`
  max-width: 340px;
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.muted};
`;
/* ========================================= NAVIGATION ========================================= */ const NavigationColumn = styled.div``;
const ColumnTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral.white};
`;
const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;
const FooterLink = styled.a`
  width: fit-content;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    transform: translateX(3px);
  }
`;
/* ========================================= CONTACT ========================================= */ const ContactColumn = styled.div``;
const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;
const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: fit-content;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;
const ContactIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;
const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.text.muted};
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.gold};
    background: ${({ theme }) => theme.colors.brand.gold};
    color: ${({ theme }) => theme.colors.brand.black};
    transform: translateY(-2px);
  }
`;
/* ========================================= MIDDLE ========================================= */ const FooterMiddle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[10]} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    padding: ${({ theme }) => theme.spacing[8]} 0;
  }
`;
const NewsletterText = styled.div``;
const NewsletterEyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.gold};
`;
const NewsletterHeading = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["2xl"]},
    3vw,
    ${({ theme }) => theme.fontSizes["4xl"]}
  );
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  color: ${({ theme }) => theme.colors.neutral.white};
  span {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-style: italic;
  }
`;
const NewsletterLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.brand.gold};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral.white};
  transition:
    gap ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};
  &:hover {
    gap: ${({ theme }) => theme.spacing[5]};
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;
/* ========================================= BOTTOM ========================================= */ const FooterBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[5]};
  }
`;
const Copyright = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;
const BottomLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;
const BottomLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
  }
`;

// const BackToTop = styled.a`
//   justify-self: end;
//   width: 42px;
//   height: 42px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid ${({ theme }) => theme.colors.border.dark};
//   border-radius: ${({ theme }) => theme.radii.pill};
//   color: ${({ theme }) => theme.colors.neutral.white};
//   transition:
//     border-color ${({ theme }) => theme.transitions.normal},
//     background ${({ theme }) => theme.transitions.normal},
//     color ${({ theme }) => theme.transitions.normal};
//   svg {
//     transform: rotate(-45deg);
//   }
//   &:hover {
//     border-color: ${({ theme }) => theme.colors.brand.gold};
//     background: ${({ theme }) => theme.colors.brand.gold};
//     color: ${({ theme }) => theme.colors.brand.black};
//   }
//   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-column: 2;
//     grid-row: 1;
//   }
//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     align-self: flex-end;
//   }
// `;
