import { TRelation, TCharacter } from '@/utils/APIs/types';
import { useState } from 'react';

export default function EditRelation({
  workId,
  isNewMode,
  characters,
  setModalOpen,
  character1,
  character2,
  relation,
}: {
  workId: string;
  isNewMode?: boolean;
  characters?: TCharacter[];
  setModalOpen?: any;
  character1?: TCharacter;
  character2?: TCharacter;
  relation?: TRelation;
}) {
  const [selectedCharacter1, setSelectedCharacter1] = useState<TCharacter | undefined>(character1);
  const [selectedCharacter2, setSelectedCharacter2] = useState<TCharacter | undefined>(character2);
  
  return (
    <div style={{ backgroundColor:"#FFF", width:"100%",height:"100%" }}>
    </div>
  );
};
