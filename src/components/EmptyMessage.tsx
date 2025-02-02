import {
  LoadingMessage,
  RelativContainer,
} from "@/styles/dashboard/Loading.style";

export interface StateMessageProps {
  messageKey: StateMessageKey;
  children?: React.ReactNode;
  absolute?: boolean;
}

export function StateMessage({
  messageKey,
  children,
  absolute = false,
}: StateMessageProps) {
  const message = STATE_MESSAGES[messageKey].replace(/\\n/g, "\n");

  if (absolute) {
    return <LoadingMessage>{message}</LoadingMessage>;
  }

  return (
    <RelativContainer>
      <LoadingMessage>{message}</LoadingMessage>
      {children}
    </RelativContainer>
  );
}

export const STATE_MESSAGES = {
  LOADING: "로딩중입니다...",
  LOADING_ERROR:
    "에러가 발생했습니다.\n새로고침을 하시거나,\n채팅 버튼을 이용해 문의해주세요.",
  ONGOING_EMPTY:
    "집필 중인 작품이 없습니다.\n아래 버튼을 눌러 새로운 작품을 집필해보세요!",
  COMPLETED_EMPTY:
    "완료된 작품이 없습니다.\n아래 버튼을 눌러 새로운 작품을 집필해보세요!",
  TRASH_EMPTY: "휴지통이 비어있습니다.",
  MEMO_EMPTY: "메모가 없습니다.\n아래 버튼을 눌러 새 메모를 작성해보세요!",
  CHARACTER_EMPTY:
    "인물 메모가 없습니다.\n아래 버튼을 눌러 새 인물를 구상해보세요!",
  MAIN_CHARACTER_EMPTY:
    "주요 인물이 없습니다.\n우측 버튼을 눌러 이동해 주요 인물을 선택해주세요.",
  KEYWORD_EMPTY: "왼쪽의 + 버튼을 눌러 새 키워드를 추가해보세요!",
  CHARACTER_NETWORK_EMPTY:
    "설정한 관계가 없습니다. \n 관계를 추가하여 인물 관계도를 확인해보세요!",
  CHARACTERISTIC_EMPTY:
    "특징이 없습니다. \n특징을 추가하여 인물의 특징을 기록해보세요!",
} as const;

export type StateMessageKey = keyof typeof STATE_MESSAGES;
