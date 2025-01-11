"use client";
import { media } from "@/styles/media";
import { styled, css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import TrashCan from "@/assets/icons/trashcan.svg";
import {
  CloseButton,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import {
  FontBold20,
  FontRegular16,
  FontSemibold14,
  FontSemibold16,
  FontTabletRegular14,
} from "@/styles/Font";
import { SubTitle } from "@/styles/workspace/Info.style";

/* Css */
export const ModalInputBoxContainer = css`
  ${FlexRowCenter}
  width: 100%;
  padding: 12px 12px;
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
export const ModalFlexRowGap24 = css`
  ${FlexRowLeftStart}
  position: relative;
  width: 100%;
  height: 100%;
  gap: 24px;

  ${media.tablet} {
    ${FlexColumnLeftStart}
  }
`;

export const ModalFlexColumnGap12 = css`
  ${FlexColumnLeftStart}
  position: relative;
  height: 100%;
  width: 100%;
  gap: 12px;
`;

/* Modal */
export const ModalContentAndFooterContainer = styled.div`
  ${FontRegular16}
  ${FlexColumnLeftStart}
  color: ${({ theme }) => theme.color.gray900};
  padding: 30px;
  max-height: 90vh;

  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 8px;

  overflow: auto;

  ${SubTitle} {
    ${FontSemibold16}
    margin-top: 32px;
  }
`;

export const ModalTitle = styled.div`
  ${FlexRowSpaceBetween}
  width: 100%;

  justify-content: space-between;

  ${CloseButton} {
    margin-bottom: auto;
  }

  ${SubTitle} {
    ${FontBold20}
    margin-top: 0;
  }

  ${media.tablet} {
    flex-direction: row;
    gap: 12px;
  }
`;

/* Input */
export const Input = styled.input`
  ${ModalInputBoxContainer}
  ${FontTabletRegular14}
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  outline: none;
`;

export const TextArea = styled(TextareaAutosize)`
  ${ModalInputBoxContainer}
  ${FontTabletRegular14}
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  outline: none;
  resize: none;
`;

/* Image */
export const ImgAndNameAndDescriptionContainer = styled.div`
  ${ModalFlexRowGap24}
  height: auto;
  align-items: flex-end;
  flex-shrink: 0;
  ${media.tablet} {
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  ${ModalFlexColumnGap12}
  flex-shrink: 0;
  background: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 240px;

  p {
    height: 220px;
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
    justify-content: center;
    align-items: center;
    object-fit: cover;
    overflow: hidden;
  }
  &:hover {
    background: ${({ theme }) => theme.color.gray200};
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

export const ChangeCover = styled.button`
  ${FlexRowCenter};
  color: ${({ theme }) => theme.color.orange500};
  padding: 8px 12px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.orange100};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 100px;

  &:hover {
    background-color: ${({ theme }) => theme.color.orange100};
  }
`;

/* Name and Role, Birth, Gender, Description */
export const NameAndDescriptionContainer = styled.div`
  ${ModalFlexColumnGap12}
`;
export const RoleContainer = styled.div`
  ${ModalFlexColumnGap12}
  justify-content: center;
`;
export const NameContainer = styled.div`
  ${ModalFlexColumnGap12}
  justify-content: center;
`;
export const DescriptionContainer = styled.div`
  ${ModalFlexColumnGap12}
`;
export const BirthAndGenderContainer = styled.div`
  ${ModalFlexRowGap24}
  padding-right: 20%;
`;
export const BirthContainer = styled.div`
  ${ModalFlexColumnGap12}
`;
export const GenderContainer = styled.div`
  ${ModalFlexColumnGap12}
`;

/* Characteristic */
export const CharacteristicContainer = styled.div`
  ${ModalFlexColumnGap12}
`;
export const CharacteristicListContainer = styled.div`
  ${ModalFlexColumnGap12}
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

export const Delete = styled(TrashCan)`
  cursor: pointer;
  transform: scale(0.7);
`;

/* Footer */

export const FooterContainer = styled.div`
  ${ModalFlexRowGap24}
  justify-content: flex-end;
  padding: 4px 12px;

  ${media.tablet} {
    flex-direction: row;
  }
`;

export const defaultButton = styled.button`
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

export const DeleteButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.color.red600};
  background: none;
  border: none;

  font-size: 14px;
  font-style: normal;
  font-weight: 350;
  line-height: 21px;
`;

export const RightButtonContainer = styled.div`
  ${ModalFlexRowGap24}
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
