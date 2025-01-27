import { KebabContext } from "@/hooks/dashboard/work/kebab";
import { KebabItem } from "@/styles/dashboard/Work/Kebab.style";
import { useContext } from "react";
import { ChangeCoverInput } from "@/styles/dashboard/Work/WorkList.style";
import { WarningModal } from "../WarningModal";

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

export const RecoverCategory2Ongoing = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("ongoing")}>
      집필중으로 복구
    </KebabItem>
  );
};
export const RecoverCategory2Completed = () => {
  const { onClickChangeCategory } = useContext(KebabContext);

  return (
    <KebabItem onClick={onClickChangeCategory("completed")}>
      완결로 복구
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
        삭제
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onClickChangeCategory("trash")}
          onClickCancel={onClickCancel}
          message={"작품을 삭제하시겠습니까? \n작품은 휴지통으로 이동합니다."}
          ConfirmButtonName={"확인"}
        />
      )}
    </>
  );
};

export const DeletePermanently = () => {
  // 영구 삭제 버튼 + 버튼 누르면 뜰 모달. 모달에서 버튼 누르면 삭제
  const {
    isOpenDeleteModal,
    onClickOpenModal,
    closeModal,
    onDeleteWork,
    onClickCancel,
  } = useContext(KebabContext);

  return (
    <>
      <KebabItem $isMajor={true} $isLast={true} onClick={onClickOpenModal}>
        영구 삭제
      </KebabItem>
      {isOpenDeleteModal && (
        <WarningModal
          closeModal={closeModal}
          onClickConfirm={onDeleteWork()}
          onClickCancel={onClickCancel}
          message={"작품을 영구 삭제하시겠습니까?"}
          ConfirmButtonName={"삭제"}
        />
      )}
    </>
  );
};
