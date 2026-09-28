import Hero from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import styled from "styled-components";
import BrandExperience from "@/components/sections/BrandExperience";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

const HomePage = () => {
  return (
    <>
      <HomeWrapper>
        <Hero />
        <BrandExperience />
        <FeaturedProducts />
        <Services />
        <About />
        <Testimonials />
        <CTA/>
        <Footer />
      </HomeWrapper>
    </>
  );
};

export default HomePage;

const HomeWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;
