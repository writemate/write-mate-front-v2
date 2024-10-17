'use client';
import { Infos } from "@/styles/workspace/Info.style";
import Cover from '@/components/workspace/character/Cover';
import Description from '@/components/workspace/character/Description';
import BirthDayAndGender from '@/components/workspace/character/BirthDayAndGender';
import Characteristics from '@/components/workspace/character/Characteristics';
import Keywords from '@/components/workspace/character/Keywords';
import RelatedEvents from '@/components/workspace/character/RelatedEvents';
import { useCharacter, CharacterContext } from '@/hooks/workspace/character/character';

export default function CharacterDetail({characterId} : {characterId?: string}) {
  const value = useCharacter(characterId);

  return (
      <CharacterContext.Provider value={value}>
        <Cover/>
        <Infos>
          <Description/>
          <BirthDayAndGender/>
          <Characteristics/>
          <Keywords/>
          <RelatedEvents/>
        </Infos>
      </CharacterContext.Provider>
  );
}
