"use client";
import { styled, css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const MemoModalContainer = styled.div`
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 8px;

  p {
    color: ${({ theme }) => theme.color.gray900};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 30px */
  }
`;

export const InputBoxContainer = css`
  width: 100%;
  display: flex;
  padding: 13px 20px;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.orange300};
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.gray200};
  }
`;

export const ModalTitle = styled.input`
  ${InputBoxContainer}
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray900};
  border: none;
  outline: none;
`;

export const ModalContent = styled(TextareaAutosize)`
  ${InputBoxContainer}
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  outline: none;
  resize: none;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 8px;
  padding-top: 8px;
`;

export const defaultButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 4px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.color.gray900};

  font-size: 14px;
  font-style: normal;
  font-weight: 350;
  line-height: 21px;
  letter-spacing: -0.16px;
`;

export const DeleteButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.red600};
  border: 1px solid ${({ theme }) => theme.color.red600};
  color: ${({ theme }) => theme.color.white};
`;

export const CancelButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray300};
  color: ${({ theme }) => theme.color.gray900};
  margin-right: 8px;
`;

export const SaveButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.gray900};
  border: 1px solid ${({ theme }) => theme.color.gray900};
  color: ${({ theme }) => theme.color.white};
`;

export const AddCharacteristicButton = styled(defaultButton)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.orange400};
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
`;

export const ImgContainer = styled.div`
  width: 160px;
  height: 140px;
  display: flex;
  background: ${({ theme }) => theme.color.gray300};
  border-radius: 8px;
  input {
    visibility: hidden;
    position: absolute;
  }
`;

export const CharacteristicContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
