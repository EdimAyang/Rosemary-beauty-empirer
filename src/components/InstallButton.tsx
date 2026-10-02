import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styled from "styled-components";

import { Button } from "./ui/Button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const InstallButton = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = useState(false);

  const [showIOSMessage, setShowIOSMessage] = useState(false);

  useEffect(() => {
    // Check if already running as an installed PWA
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone;

    if (standalone) {
      setIsInstalled(true);
      return;
    }

    // Android / Chrome / Edge / supported browsers
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();

      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  const handleInstall = async () => {
    // iOS doesn't support beforeinstallprompt
    if (isIOS && !installPrompt) {
      setShowIOSMessage(true);
      return;
    }

    if (!installPrompt) return;

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Don't show on browsers where installation isn't currently available
  // unless we're on iOS.
  if (!installPrompt && !isIOS) {
    return null;
  }

  return (
    <>
      <InstallButtonElement
        type="button"
        $variant="outline"
        onClick={handleInstall}
      >
        <Download size={17} strokeWidth={1.8} />
      </InstallButtonElement>

      {showIOSMessage && (
        <IOSOverlay onClick={() => setShowIOSMessage(false)}>
          <IOSCard onClick={(event) => event.stopPropagation()}>
            <IOSTitle>Install RBE</IOSTitle>

            <IOSText>
              Add Rosemary Beauty Empire to your home screen for a faster
              app-like experience.
            </IOSText>

            <IOSSteps>
              <li>
                Tap the <strong>Share</strong> button in Safari.
              </li>

              <li>
                Select <strong>Add to Home Screen</strong>.
              </li>

              <li>
                Tap <strong>Add</strong>.
              </li>
            </IOSSteps>

            <CloseButton type="button" onClick={() => setShowIOSMessage(false)}>
              Got it
            </CloseButton>
          </IOSCard>
        </IOSOverlay>
      )}
    </>
  );
};

export default InstallButton;

const InstallButtonElement = styled(Button)`
  width: 45px;
  height: 45%;
  border-radius: ${({ theme }) => theme.radii.pill};
  white-space: nowrap;

  svg {
    flex-shrink: 0;

    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateY(-1px);
  }
`;

const IOSOverlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: ${({ theme }) => theme.zIndex.modal};

  display: flex;
  align-items: flex-end;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing[6]};

  background: rgba(0, 0, 0, 0.5);

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const IOSCard = styled.div`
  width: min(100%, 420px);

  padding: ${({ theme }) => theme.spacing[8]};

  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: ${({ theme }) => theme.radii.xl};

  background: ${({ theme }) => theme.colors.background.card};

  box-shadow: ${({ theme }) => theme.shadows.luxury};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const IOSTitle = styled.h3`
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

const IOSText = styled.p`
  margin: ${({ theme }) => theme.spacing[3]} 0 0;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

const IOSSteps = styled.ol`
  margin: ${({ theme }) => theme.spacing[5]} 0;

  padding-left: ${({ theme }) => theme.spacing[5]};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  color: ${({ theme }) => theme.colors.text.primary};

  li::marker {
    color: ${({ theme }) => theme.colors.brand.gold};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const CloseButton = styled(Button)`
  width: 100%;
`;
