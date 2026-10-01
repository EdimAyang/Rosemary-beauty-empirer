import { Download } from "lucide-react";
import styled from "styled-components";
import { Button } from "./ui/Button";

interface DownloadButtonProps {
  href: string;
  fileName?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

const DownloadButton = ({
  href,
  fileName,
  children = "Download",
  variant = "primary",
}: DownloadButtonProps) => {
  return (
    <StyledDownloadButton
      as="a"
      href={href}
      download={fileName}
      $variant={variant}
    >
      <Download size={17} strokeWidth={1.8} />

      <span>{children}</span>
    </StyledDownloadButton>
  );
};

export default DownloadButton;

const StyledDownloadButton = styled(Button)`
  gap: ${({ theme }) => theme.spacing[2]};

  text-decoration: none;

  cursor: pointer;

  svg {
    flex-shrink: 0;

    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateY(2px);
  }
`;