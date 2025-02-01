import { TCharacter, TMCharacter, TSimpleCharacter } from "./APIs/types";

export const getName = (
  character: TMCharacter | TCharacter | TSimpleCharacter
) => {
  const DEFAULT_NAME = "새 인물";

  if (!character) return DEFAULT_NAME;
  if (!character.description && !character.ch_name) return DEFAULT_NAME;
  if (!character.ch_name) return character.description;
  return character.ch_name;
};
