import { useState } from 'react';
import { DropdownMenuWrapper, DropdownSelector, DropDownListContainer, DropDownOption } from '@/styles';
import DropButtonIcon from '@/assets/icons/dropButton.svg';
import { TCharacter } from '@/utils/APIs/types';

export default function DropdownCharacter({ placeholder, options, selected, setSelected }: { placeholder: string, options: TCharacter[], selected?: string , setSelected: (option: TCharacter) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const onBlur = () => {
    setIsOpen(false);
  }

  const handleSelect = (option: TCharacter) => () => {
    setIsOpen(false);
    setSelected(option);
  }

  return (
    <DropdownMenuWrapper tabIndex={0} onBlur={onBlur}>
      <DropdownSelector onClick={() => setIsOpen(!isOpen)}>
        <span>{selected??placeholder}</span>
        <DropButtonIcon/>
      </DropdownSelector>
      {isOpen && (
        <DropDownListContainer>
          <DropDownOption>{placeholder}</DropDownOption>
          {options.map((option) => (
            <DropDownOption key={option._id} onClick={handleSelect(option)}>{option.ch_name}</DropDownOption>
          ))}
        </DropDownListContainer>
      )}
    </DropdownMenuWrapper>
  );
}
