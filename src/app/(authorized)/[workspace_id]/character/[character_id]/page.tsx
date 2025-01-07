"use client";
import { BackButton } from "@/styles/workspace/Info.style";
import { Infos } from "@/styles/workspace/Info.style";
import Cover from "@/components/workspace/character/detail/Cover";
import Description from "@/components/workspace/character/detail/Description";
import BirthDayAndGender from "@/components/workspace/character/detail/BirthDayAndGender";
import Characteristics from "@/components/workspace/character/detail/Characteristics";
import Keywords from "@/components/workspace/character/Keywords";
import RelatedEvents from "@/components/workspace/character/detail/RelatedEvents";
import {
  useCharacter,
  CharacterContext,
} from "@/hooks/workspace/character/character";

export default function Character() {
  const value = useCharacter();

  return (
    <CharacterContext.Provider value={value}>
      <BackButton onClick={() => history.back()} />
      <Cover />
      <Infos>
        <Description />
        <BirthDayAndGender />
        <Characteristics />
        <Keywords />
        <RelatedEvents />
      </Infos>
    </CharacterContext.Provider>
  );
}
