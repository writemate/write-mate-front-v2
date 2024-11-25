"use Client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMemoButton } from "@/styles/dashboard/MCharacterList";
import { TMCharacter } from "@/utils/APIs/types";
import { useContext } from "react";

export default function CharacterList() {
  const { memoCharacterList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMCharacter;

  return (
    <div>
      {error && <Error />}
      {isLoading && <Loading />}
      {memoCharacterList
        .slice()
        .reverse()
        .map((memo) => (
          <MemoItem key={memo.id} character={memo} />
        ))}
      <AddMemo />
      {memoCharacterList.length === 0 && <AddMemo />}
    </div>
  );
}

function MemoItem({ character }: { character: TMCharacter }) {
  const { onClickMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;

  const getName = () => {
    if (!character.description && !character.ch_name) return "이름 없음";
    if (!character.ch_name)
      return "" + character.description.slice(0, 10) + "...";
    if (character.ch_name.length > 10)
      return character.ch_name.slice(0, 10) + "...";
    return character.ch_name;
  };

  const getImg = () => {
    if (!character.ch_image) return getName().slice(0, 1);
    return <img src={character.ch_image} alt="인물 이미지" />;
  };

  return (
    <div
      onClick={onClickMCharacterDescription(character)}
      style={{ border: "1px solid black" }}
    >
      <p>id: {character.id}</p>
      <p>
        이미지 예시:{" "}
        <img
          src="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
          alt="예시 이미지"
          width="20px"
          height="20px"
        />
      </p>
      <p>이미지: {getImg()}</p>
      <p>이름: {getName()}</p>
    </div>
  );
}

function AddMemo() {
  const { memoCharacterList, getNewlyCreatedMCharacter } =
    useContext(DashboardContext).ideaBoxMCharacter;
  const { onClickMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  const onClickAddMemo = async () => {
    const newMemo = await getNewlyCreatedMCharacter();
    if (!newMemo) return;
    onClickMCharacterDescription(newMemo)();
  };

  return (
    <AddMemoButton
      $isEmpty={memoCharacterList.length === 0}
      onClick={onClickAddMemo}
    >
      인물 메모 추가
    </AddMemoButton>
  );
}

function Error() {
  return (
    <LoadingMessage>
      에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해 문의해주세요.
    </LoadingMessage>
  );
}

function Loading() {
  return <LoadingMessage>로딩 중...</LoadingMessage>;
}

function Creating() {
  return <LoadingMessage>메모를 생성하는 중...</LoadingMessage>;
}
