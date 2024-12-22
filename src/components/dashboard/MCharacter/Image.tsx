import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { ImageContainer, ImageButtonContainer } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterImage() {
  const { selectedMCharacter } = useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <ImageContainer>
      <ImageButtonContainer>
        <input type="file" />
        <button>이미지 업로드</button>
      </ImageButtonContainer>
      {selectedMCharacter.ch_image && <img src={selectedMCharacter.ch_image} alt={selectedMCharacter.ch_name} />}
      {!selectedMCharacter.ch_image && selectedMCharacter.ch_name && <p>{selectedMCharacter.ch_name[0]}</p>}
      {!selectedMCharacter.ch_image && !selectedMCharacter.ch_name && <p> </p>}
    </ImageContainer>
  );
}
