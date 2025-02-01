"use client";

import Modal from "@/components/Modal";
import {
  ButtonContainer,
  ModalButton,
  ModalContainer,
} from "@/styles/WarningModal";
import WarningIcon from "@/assets/icons/danger.svg";

export function WarningModal({
  closeModal,
  onClickConfirm,
  messageKey,
  onClickCancel,
}: {
  closeModal: () => void | ((e: React.MouseEvent<HTMLDivElement>) => void);
  onClickConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  messageKey: WarningMessageKey;
}) {
  const message = WARNING_MESSAGES[messageKey].replace(/\\n/g, "\n");

  return (
    <Modal closeModal={closeModal} maxWidth="450px">
      <ModalContainer>
        <WarningIcon />
        <p>{message}</p>
        <ButtonContainer>
          <ModalButton $isDanger={true} onClick={onClickConfirm}>
            {ConfirmButtonName[messageKey]}
          </ModalButton>
          <ModalButton $isDanger={false} onClick={onClickCancel}>
            취소
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
}

const WARNING_MESSAGES = {
  characterDelete: "인물을 삭제하시겠습니까?\n삭제된 인물은 복구가 어렵습니다.",
  characteristicDelete:
    "특징을 삭제하시겠습니까?\n삭제된 특징은 복구가 어렵습니다.",
  memoCharacterDelete:
    "인물 메모를 삭제하시겠습니까?\n삭제된 메모는 복구가 어렵습니다.",
  memoDelete: "메모를 삭제하시겠습니까?\n삭제된 메모는 복구가 어렵습니다.",
  workDelete: "작품을 삭제하시겠습니까?\n작품은 휴지통으로 이동합니다.",
  trashWorkDelete:
    "작품을 영구 삭제하시겠습니까?\n영구 삭제된 작품은 복구가 어렵습니다.",
  fileDelete: "파일을 삭제하시겠습니까?\n삭제된 파일은 복구가 어렵습니다.",
  folderDelete:
    "폴더를 삭제하시겠습니까?\n폴더 내 모든 파일이 함께 삭제되며 복구가 어렵습니다.",
  keywordDelete:
    "키워드를 삭제하시겠습니까?\n삭제된 키워드는 복구가 어렵습니다.",
  chapterDelete:
    "챕터를 삭제하시겠습니까?\n챕터 내의 이벤트도 함께 삭제되며 복구가 어렵습니다.",
  eventDelete: "이벤트를 삭제하시겠습니까?\n삭제된 이벤트는 복구가 어렵습니다.",
  mobileAPPuse:
    "데스크탑에 최적화된 서비스입니다.\n모바일에서는 일부 기능이 제한될 수 있습니다.",
} as const;

const ConfirmButtonName = {
  characterDelete: "삭제",
  characteristicDelete: "삭제",
  memoCharacterDelete: "삭제",
  memoDelete: "삭제",
  workDelete: "삭제",
  trashWorkDelete: "삭제",
  fileDelete: "삭제",
  folderDelete: "삭제",
  keywordDelete: "삭제",
  chapterDelete: "삭제",
  eventDelete: "삭제",
  mobileAPPuse: "확인",
};

export type WarningMessageKey = keyof typeof WARNING_MESSAGES;
