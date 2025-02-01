import { ExplainMessage, HelpContainer, HelpIcon } from "@/styles/Help.style";

export function Help({
  messageKey,
  isRight,
}: {
  messageKey: HelpMessageKey;
  isRight?: boolean;
}) {
  const message = HELP_MESSAGES[messageKey].replace(/\\n/g, "\n");

  return (
    <HelpContainer>
      <HelpIcon aria-hidden="true" />
      <ExplainMessage $isRight={isRight} role="tooltip" aria-label={message}>
        {message}
      </ExplainMessage>
    </HelpContainer>
  );
}

export const HELP_MESSAGES = {
  PLAN: "원고를 작성하기 전에,\n어떤 이야기를 만들고 싶으신가요?",
  TITLE: "제목이 고민되시나요?\n다른 요소를 먼저 정해도 괜찮아요!",
  LOGLINE: "이 작품은 어떤 이야기를 담고 있나요?",
  WORK_INTRO: "어떤 이야기를 독자들에게 들려주고 싶으신가요?",
  EXPECTED_VOLUME:
    "이야기의 규모는 어떻게 계획하고 계신가요?\n단편은 약 30편, 중장편은 200편 이상이랍니다!",
  MAIN_CHARACTER:
    "이야기의 중심이 될 캐릭터는 누구인가요?\n인물을 추가한 후, 별표를 눌러 주요 인물을 지정해보세요!",
  MAIN_PLOT: "이야기는 어떤 흐름으로 진행되나요?",
  WRITE_MANUSCRIPT: "기획이 완료되었어요!\n이제 글을 써볼 시간입니다.",
  WORK_STUDIO: "작품 카드를 눌러 작품을 구상하고 집필을 시작해보세요!",
  IDEA_BOX: "아이디어 박스를 눌러 아이디어를 정리하고 관리해보세요!",
  TRASH:
    "삭제한 작품을 확인하고 복구할 수 있어요! \n휴지통의 작품은 30일 후에는 영구 삭제됩니다.",
} as const;

export type HelpMessageKey = keyof typeof HELP_MESSAGES;
