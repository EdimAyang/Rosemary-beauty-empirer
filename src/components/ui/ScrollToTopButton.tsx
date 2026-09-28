import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <ScrollButton
      type="button"
      aria-label="Scroll to top"
      onClick={handleScrollToTop}
    >
      <ArrowUp size={18} strokeWidth={1.7} />
    </ScrollButton>
  );
};

export default ScrollToTopButton;

const ScrollButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 92px;

  z-index: 999;

  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.brand.gold};
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.brand.gold};
  background: ${({ theme }) => theme.colors.background.card};

  box-shadow: ${({ theme }) => theme.shadows.md};

  cursor: pointer;

  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: ${({ theme }) => theme.colors.brand.gold};
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 16px;
    bottom: 84px;

    width: 42px;
    height: 42px;
  }
`;