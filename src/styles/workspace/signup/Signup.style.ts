import styled from "styled-components";
import Image from "next/image";

export const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #fff4e0, #f3e1d0);
  overflow: hidden;
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 101;
`;

export const BottomImage = styled(Image)`
  position: absolute;
  bottom: 0;
  width: 1000px;
  visibility: hidden;
  max-width: 100%;
  height: 46%;

  @media (min-width: 1024px) {
    visibility: visible;
  }
`;

export const PaperImage = styled(Image)`
  position: absolute;
  object-fit: contain;
  right: 50%;
  top: 0;
  width: 100%;
  transform: translate(50%, -50%);
  display: none;

  @media (min-width: 1024px) {
    display: block;
    right: -10%;
    top: -35%;
    width: 70%;
    transform: translate(0, 0);
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DesktopTextContainer = styled.div`
  z-index: 99;
  margin-left: 10%;
  margin-top: 20%;
  display: none;
  height: 100%;
  color: #353535;

  @media (min-width: 1024px) {
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export const DesktopTitle = styled.div`
  font-size: 63px;
  font-weight: 700;
  margin-top: 0.7rem;
`;

export const DesktopSubtitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 1.3rem;
  font-weight: 550;
`;

export const MobileTextContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileTitle = styled.div`
  font-size: 50px;
  font-weight: 700;
`;

export const MobileSubtitle = styled.div`
  display: flex;
  max-width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const LoginContainer = styled.div`
  z-index: 99;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    margin-top: -250px;
    margin-right: 10%;
    flex-basis: 50%;
    justify-content: flex-start;
  }
`;

export const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 300px;

  @media (min-width: 1024px) {
    width: 55%;
  }
`;

export const LoginLine = styled.hr`
  border: 1px solid #9292927d;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  height: 3.5rem;
  width: 300px;
  border: 1px solid #e6e6e9;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  margin-top: 1rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.07);

  @media (min-width: 1024px) {
    width: 55%;
  }
`;

export const LoginText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.175rem;
  font-weight: bold;
`;
