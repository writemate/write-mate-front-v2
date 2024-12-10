"use client";
import { media } from "@/styles/media";
import { styled, css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

/* Css */
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
export const FlexRow = css`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 8px;

  ${media.tablet} {
    flex-direction: column;
  }
`;

export const FlexColumn = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 8px;
`;

/* Modal */
export const ModalContentAndFooterContainer = styled.div`
  max-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
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

/* Content */
export const ModalContentContainer = styled.div`
  ${FlexColumn}
  padding: 12px;
  gap: 12px;
  overflow: auto;
  max-height: 70vh;
`;

/* Input */
export const Input = styled.input`
  ${InputBoxContainer}
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  outline: none;
`;

export const TextArea = styled(TextareaAutosize)`
  ${InputBoxContainer}
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  outline: none;
  resize: none;
`;

/* Image */
export const ImgAndNameAndDescriptionContainer = styled.div`
  ${FlexRow}
  height: auto;
  gap: 16px;
  ${media.tablet} {
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  ${FlexColumn}
  flex-shrink: 0;
  background: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  width: 160px;

  p {
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.gray400};
    font-size: 48px;
    user-select: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    filter: brightness(0.9);
    * {
      visibility: visible;
    }
  }
`;

export const ImageButtonContainer = styled.div`
  position: absolute;
  input {
    display: none;
  }
  button {
    visibility: hidden;
    cursor: pointer;
  }
`;

/* Name and Role, Birth, Gender, Description */
export const NameAndDescriptionContainer = styled.div`
  ${FlexColumn}
  justify-content: space-between;
`;
export const RoleContainer = styled.div`
  ${FlexColumn}
`;
export const NameContainer = styled.div`
  ${FlexColumn}
`;
export const DescriptionContainer = styled.div`
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

/* Characteristic */
export const CharacteristicContainer = styled.div`
  ${FlexColumn}
`;
export const CharacteristicListContainer = styled.div`
  ${FlexColumn}
  align-items: center;
`;

export const CharacteristicCard = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: flex-end;

  height: fit-content;
  width: 100%;
  padding: 13px 13px;
  gap: 4px;

  border-radius: 8px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);

  ${TextArea} {
    padding: 4px;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    box-shadow: none;
  }
`;

export const CharateristicHeader = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  ${Input} {
    padding: 4px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    box-shadow: none;
  }
`;

/* Footer */

export const FooterContainer = styled.div`
  ${FlexRow}
  justify-content: space-between;
  padding: 12px;

  ${media.tablet} {
    flex-direction: row;
  }
`;

export const defaultButton = styled.button`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.color.gray900};

  font-size: 14px;
  font-style: normal;
  font-weight: 350;
  line-height: 21px;
`;

export const DeleteButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.red600};
  border: 1px solid ${({ theme }) => theme.color.red600};
  color: ${({ theme }) => theme.color.white};
`;

export const RightButtonContainer = styled.div`
  ${FlexRow}
  width: fit-content;
  ${media.tablet} {
    flex-direction: row;
  }
`;

export const CancelButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray300};
  color: ${({ theme }) => theme.color.gray900};
`;

export const SaveButton = styled(defaultButton)`
  background: ${({ theme }) => theme.color.gray900};
  border: 1px solid ${({ theme }) => theme.color.gray900};
  color: ${({ theme }) => theme.color.white};
`;

export const AddCharacteristicButton = styled(defaultButton)`
  padding: 4px 4px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.orange400};
`;
