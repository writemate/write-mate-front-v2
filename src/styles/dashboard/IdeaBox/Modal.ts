"use client";
import { styled, css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const ModalContainer = styled.div`
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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
    line-height: 150%;
  }
`;

export const InputBoxContainer = css`
  width: 100%;
  display: flex;
  padding: 12px 12px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
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

export const FlexRow = css`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 8px;
`;

export const FlexColumn = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 8px;
`;

export const ImgAndNameAndBirthAndGenderContainer = styled.div`
  ${FlexRow}
  height: 160px;
  gap: 16px;
`;
export const ImageContainer = styled.div`
  flex: 1;
  ${FlexColumn}
`;
export const ImageBackgoundContainer = styled.div`
  ${FlexRow}
  background: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);

  input {
    visibility: hidden;
    position: absolute;
  }

  p {
    color: ${({ theme }) => theme.color.gray400};
    font-size: 48px;
    user-select: none;
  }
`;
export const NameAndBirthAndGenderContainer = styled.div`
  flex: 3;
  ${FlexColumn}
  justify-content: space-between;
`;
export const NameContainer = styled.div`
  ${FlexColumn}
`;
export const BirthAndGenderContainer = styled.div`
  ${FlexRow}
`;
export const BirthContainer = styled.div`
  ${FlexColumn}
`;
export const GenderContainer = styled.div`
  ${FlexColumn}
`;
export const CharacteristicContainer = styled.div`
  ${FlexColumn}
`;
