import styled from "styled-components";

export const Container = styled.div`
  width: min(
    calc(100% - 2rem),
    ${({ theme }) => theme.layout.maxWidth}
  );

  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: min(
      calc(100% - 4rem),
      ${({ theme }) => theme.layout.maxWidth}
    );
  }
`;

export const Section = styled.section`
  padding-block: 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-block: 6rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-block: 8rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;

  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;