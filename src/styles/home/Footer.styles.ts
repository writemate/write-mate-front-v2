import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: white;
`;

export const FooterContent = styled.div`
  max-width: 96rem; /* max-w-6xl */
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
  @media (min-width: 640px) {
    padding: 0 1.5rem; /* sm:px-6 */
  }
`;

export const BottomArea = styled.div`
  border-top: 1px solid #e5e7eb; /* border-gray-200 */
  padding: 1rem 0; /* py-4 */
  @media (min-width: 768px) {
    padding: 2rem 0; /* md:py-8 */
  }
`;

export const PolicyLinks = styled.div`
  margin-right: 1rem; /* mr-4 */
  font-size: 0.875rem; /* text-sm */
  color: #4b5563; /* text-gray-600 */
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CopyrightNote = styled.div`
  margin-right: 1rem; /* mr-4 */
  font-size: 0.875rem; /* text-sm */
  color: #4b5563; /* text-gray-600 */
`;
