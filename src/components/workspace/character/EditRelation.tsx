import { TRelation, TCharacter } from '@/utils/APIs/types';
import { useState } from 'react';

type Props<T extends boolean> ={
  isNewMode: T,
  characterList?: T extends true ? TCharacter[] : undefined,
  character1?: T extends true ? undefined : TCharacter,
  character2?: T extends true ? undefined : TCharacter,
  relation?: T extends true ? undefined : TRelation,
}

export default function EditRelation<T extends boolean>({
  isNewMode,
  characterList,
  character1,
  character2,
  relation,
}: Props<T>) {
  
  return (
    <div style={{ backgroundColor:"#FFF", width:"100%",height:"100%" }}>
    </div>
  );
};
