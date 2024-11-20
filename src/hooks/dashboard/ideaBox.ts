import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { createContext, use, useEffect, useState } from "react";
import { ideaBoxCategory } from "@/utils/APIs/types";
import { getMemo } from "@/utils/APIs/dashboard";

export function useIdeaBox() {
  const queryClient = useQueryClient();

  // 아이디어 보관함 카테고리
  const [ideaCategory, setIdeaCategory] = useState<
    keyof typeof ideaBoxCategory
  >(() => {
    if (typeof window !== "undefined") {
      const category = localStorage.getItem("ideaCategory");
      return category
        ? (category as (typeof ideaBoxCategory)[keyof typeof ideaBoxCategory])
        : "memo";
    }
    return "memo";
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ideaCategory", ideaCategory);
    }
  }, [ideaCategory]);
  function handleIdeaCategoryChange(
    category: (typeof ideaBoxCategory)[keyof typeof ideaBoxCategory]
  ) {
    setIdeaCategory(category);
  }

  return {
    ideaCategory,
    handleIdeaCategoryChange,
  };
}

export const IdeaBoxContext = createContext(
  {} as ReturnType<typeof useIdeaBox>
);
