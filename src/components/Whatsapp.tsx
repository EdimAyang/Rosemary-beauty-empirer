import { WhatsAppIcon } from "@/lib/icons/Whatsapp";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WHATSAPP_NUMBER } from "@/lib/constants";



const WhatsAppFloat = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);
    // const initialTimer = window.setTimeout(() => {
    //   setShowMessage(true);
    // }, 2500);

    // const interval = window.setInterval(() => {
    //   setShowMessage(true);

    //   window.setTimeout(() => {
    //     setShowMessage(false);
    //   }, 5000);
    // }, 12000);

    // return () => {
    //   window.clearTimeout(initialTimer);
    // //   window.clearInterval(interval);
    // };
  }, []);

  const handleOpen = () => {
    const message = encodeURIComponent(
      "Hello Rosemary Beauty Empire, I would like to make an enquiry about your services.",
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Wrapper>
      {showMessage && (
        <Message
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <MessageContent>
            <MessageEyebrow>ROSEMARY BEAUTY EMPIRE</MessageEyebrow>

            <MessageText>
              Need help choosing a service?
              <br />
              <strong>We&apos;d love to hear from you.</strong>
            </MessageText>

            <MessageAction onClick={handleOpen}>
              Chat with us
              <MessageCircle size={14} strokeWidth={1.8} />
            </MessageAction>
          </MessageContent>

          <CloseButton
            type="button"
            aria-label="Close WhatsApp message"
            onClick={() => setShowMessage(false)}
          >
            <X size={13} strokeWidth={1.8} />
          </CloseButton>
        </Message>
      )}

      <WhatsAppButton
        type="button"
        aria-label="Chat with Rosemary Beauty Empire on WhatsApp"
        onClick={handleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <Pulse />

        <IconWrapper
          animate={{
            rotate: [0, -7, 7, -4, 4, 0],
          }}
          transition={{
            duration: 0.7,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeInOut",
          }}
        >
          <WhatsAppIcon />
        </IconWrapper>
      </WhatsAppButton>
    </Wrapper>
  );
};

export default WhatsAppFloat;

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  right: 26px;
  bottom: 4px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 16px;
    bottom: 16px;
  }
`;

const WhatsAppButton = styled(motion.button)`
  position: relative;

  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.neutral.white};
  background: #25d366;

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.18),
    0 4px 12px rgba(37, 211, 102, 0.2);

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 54px;
    height: 54px;
  }
`;

const Pulse = styled.span`
  position: absolute;
  inset: -5px;

  border: 1px solid rgba(37, 211, 102, 0.55);
  border-radius: 50%;

  animation: whatsappPulse 2.5s ease-out infinite;

  pointer-events: none;

  @keyframes whatsappPulse {
    0% {
      opacity: 0.7;
      transform: scale(0.92);
    }

    70% {
      opacity: 0;
      transform: scale(1.35);
    }

    100% {
      opacity: 0;
      transform: scale(1.35);
    }
  }
`;

const IconWrapper = styled(motion.span)`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Message = styled(motion.div)`
  position: relative;

  width: 285px;
  padding: 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.13);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(285px, calc(100vw - 32px));
  }
`;

const MessageContent = styled.div`
  padding-right: 12px;
`;

const MessageEyebrow = styled.span`
  display: block;

  margin-bottom: 9px;

  color: ${({ theme }) => theme.colors.brand.gold};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.16em;
`;

const MessageText = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.76rem;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`;

const MessageAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  margin-top: 15px;
  padding: 0;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.brand.gold};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: 600;

  cursor: pointer;

  transition: gap ${({ theme }) => theme.transitions.fast};

  &:hover {
    gap: 11px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 9px;
  right: 9px;

  width: 24px;
  height: 24px;

  display: grid;
  place-items: center;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.text.muted};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
