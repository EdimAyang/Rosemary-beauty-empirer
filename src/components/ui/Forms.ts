import styled from "styled-components";


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.875rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  padding: 0 1rem;

  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.neutral.white};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.sm};

  outline: none;

  transition: border ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;

  padding: 1rem;

  resize: vertical;

  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.neutral.white};

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.sm};

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }
`;