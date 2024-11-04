import { ContentTextArea } from "@/styles/workspace/plot/Chapter.styles";
import { useEffect, useRef, useState } from "react";

interface AutoResizeInputProps {
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
  isEvent?: boolean;
}

export default function AutoResizeInput({
  value,
  placeholder,
  onChange,
  isEvent = false,
}: AutoResizeInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 높이를 조정
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputValue]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <ContentTextArea
      isEvent={isEvent}
      ref={textareaRef}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      rows={1}
    ></ContentTextArea>
  );
}
