import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: white;
  padding-top: 3rem;
`;

export const FooterContent = styled.div`
  max-width: 96rem;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
`;

export const BottomArea = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
  @media (min-width: 768px) {
    padding-top: 2rem;
  }
`;

export const PolicyLinks = styled.div`
  margin-right: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CopyrightNote = styled.div`
  margin-right: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;
