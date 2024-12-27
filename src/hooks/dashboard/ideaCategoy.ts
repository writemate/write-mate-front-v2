import { ideaBoxCategory } from "@/utils/APIs/types";
import { createContext, useEffect, useState } from "react";

function defaultCategory() {
  if (typeof window === "undefined") return "memo";
  if (!localStorage.getItem("ideaCategory")) return "memo";
  return localStorage.getItem("ideaCategory") as keyof typeof ideaBoxCategory;
}

export function useIdeaCategory() {
  const [ideaCategory, setIdeaCategory] =
    useState<keyof typeof ideaBoxCategory>(defaultCategory());

  const onClickMemo = () => {
    setIdeaCategory(ideaBoxCategory.memo);
  };
  const onClickCharacter = () => {
    setIdeaCategory(ideaBoxCategory.character);
  };

  const isActiveCategory = (category: keyof typeof ideaBoxCategory) => {
    return ideaCategory === category;
  };

  const recordCategory = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ideaCategory", ideaCategory);
    }
  };

  useEffect(() => {
    recordCategory();
  }, [ideaCategory]);

  return {
    ideaCategory,
    isActiveCategory,
    onClickMemo,
    onClickCharacter,
  };
}

export const ideaCategoryContext = createContext(
  {} as ReturnType<typeof useIdeaCategory>
);
