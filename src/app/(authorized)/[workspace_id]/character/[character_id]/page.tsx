'use client';
import { Infos } from "@/styles/workspace/Info.style";
import Cover from '@/components/workspace/character/Cover';
import Introduction from '@/components/workspace/info/Introduction';
import ExpectedQuantity from '@/components/workspace/info/ExpectedQuantity';
import MainCharacter from '@/components/workspace/info/MainCharacter';
import MainPlot from '@/components/workspace/info/MainPlot';
import { useCharacter, CharacterContext } from '@/hooks/workspace/character/character';

export default function Character() {
  const value = useCharacter();

  return (
      <CharacterContext.Provider value={value}>
        <Cover/>
        <Infos>
          <Introduction/>
          <ExpectedQuantity/>
          <MainCharacter/>
          <MainPlot/>
        </Infos>
      </CharacterContext.Provider>
  );
}
