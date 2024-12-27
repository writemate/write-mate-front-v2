import { KebabContext } from "@/hooks/dashboard/work/kebab";
import { KebabItem } from "@/styles/dashboard/Work/Kebab";
import { useContext } from "react";
import { WarningModal } from "../WarningModal";
import { ChangeCoverInput } from "@/styles/dashboard/Work/WorkList";

export const ChangeTitle = () => {
  const { onClickChangeTitle } = useContext(KebabContext);

  return <KebabItem onClick={onClickChangeTitle}>작품명 변경</KebabItem>;
};

export const ChangeCategory2Ongoing = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("ongoing")}>
      집필중으로 변경
    </KebabItem>
  );
};
export const ChangeCategory2Completed = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("completed")}>
      완결로 변경
    </KebabItem>
  );
};

export const ChangeCover = () => {
  const { imageInputRef, onClickChangeCover, onChangeCoverImage } =
    useContext(KebabContext);

  return (
    <>
      <ChangeCoverInput
        type="file"
        accept="image/*"
        onChange={onChangeCoverImage}
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={imageInputRef}
      />
      <KebabItem onClick={onClickChangeCover}>표지 이미지 변경</KebabItem>
    </>
  );
};

export const ChangeCategory2Trash = () => {
  const {
    isOpenDeleteModal,
    closeModal,
    onClickOpenModal,
    onClickCancel,
    onClickChangeCategory,
  } = useContext(KebabContext);

  return (
    <>
      <KebabItem $isMajor={true} $isLast={true} onClick={onClickOpenModal}>
        휴지통으로 이동
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onClickChangeCategory("trash")}
          onClickCancel={onClickCancel}
          message={"작품을 휴지통으로 이동하시겠습니까?"}
          ConfirmButtonName={"이동"}
        />
      )}
    </>
  );
};

export const DeletePermanently = () => {
  const { isOpenDeleteModal, onClickOpenModal, closeModal, onDeleteWork } =
    useContext(KebabContext);

  return (
    <>
      <KebabItem $isMajor={true} $isLast={true} onClick={onClickOpenModal}>
        영구 삭제
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onDeleteWork()}
          onClickCancel={closeModal}
          message={"작품을 영구 삭제하시겠습니까?"}
          ConfirmButtonName={"삭제"}
        />
      )}
    </>
  );
};
