import styled from "styled-components";

export const ChapterContainer = styled.form<{ isOpenAlone: boolean }>`
  width: 100%;
  height: ${(props) => !props.isOpenAlone && "110px"};

  background: #ffffff;
  border: 1px solid #f49661;
  margin-bottom: 18.18px;

  flex-wrap: wrap;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;
