import { useState } from "react";
import {
  DropdownMenuWrapper,
  DropdownSelector,
  DropDownListContainer,
  DropDownOption,
} from "@/styles";
import DropButtonIcon from "@/assets/icons/dropButton.svg";

/**
 *
 * @param
 * setSelected를 통해 selected를 변경할 수 있어야함.
 * @returns
 */
export default function DropdownMenu<T extends string[]>({
  placeholder,
  options,
  selected,
  setSelected,
}: {
  placeholder: string;
  options: T;
  selected: string | null;
  setSelected: (option: T[number]) => () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onBlur = () => {
    setIsOpen(false);
  };

  const handleSelect = (option: string) => () => {
    setIsOpen(false);
    setSelected(option)();
  };

  return (
    <DropdownMenuWrapper tabIndex={0} onBlur={onBlur}>
      <DropdownSelector onClick={() => setIsOpen(!isOpen)}>
        <span>{selected ?? placeholder}</span>
        <DropButtonIcon />
      </DropdownSelector>
      {isOpen && (
        <DropDownListContainer>
          <DropDownOption>{placeholder}</DropDownOption>
          {options.map((option) => (
            <DropDownOption key={option} onClick={handleSelect(option)}>
              {option}
            </DropDownOption>
          ))}
        </DropDownListContainer>
      )}
    </DropdownMenuWrapper>
  );
}
