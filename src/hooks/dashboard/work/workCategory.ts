import { workspaceCategory } from "@/utils/APIs/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

function defaultCategory() {
  if (typeof window === "undefined") return "ongoing";
  if (!localStorage.getItem("workCategory")) return "ongoing";
  return localStorage.getItem("workCategory") as keyof typeof workspaceCategory;
}

export function useWorkCategory() {
  const router = useRouter();
  const pathname = usePathname();
  const [workCategory, setWorkCategory] =
    useState<keyof typeof workspaceCategory>(defaultCategory());

  const onRedirectToOngoingWorkClick = () => {
    router.push("/dashboard");
    setWorkCategory("ongoing");
  };
  const onCategoryOngoingClick = () => {
    setWorkCategory(workspaceCategory.ongoing);
  };
  const onCategoryCompletedClick = () => {
    setWorkCategory(workspaceCategory.completed);
  };
  const onCategoryTrashClick = () => {
    setWorkCategory(workspaceCategory.trash);
  };

  const recordCategory = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("workCategory", workCategory);
    }
  };
  const matchCategoryNPath = () => {
    if (pathname === "/dashboard" && workCategory === workspaceCategory.trash) {
      setWorkCategory("ongoing");
    } else if (pathname === "/dashboard/trash") {
      setWorkCategory("trash");
    }
  };

  const isActiveCategory = (
    currentCategory: keyof typeof workspaceCategory
  ) => {
    return workCategory === currentCategory;
  };

  useEffect(() => {
    recordCategory();
    console.log(workCategory);
  }, [workCategory]);
  useEffect(() => {
    matchCategoryNPath();
  }, [pathname]);

  return {
    workCategory,
    onRedirectToOngoingWorkClick,
    onCategoryOngoingClick,
    onCategoryCompletedClick,
    onCategoryTrashClick,
    isActiveCategory,
  };
}

export const WorkCategoryContext = createContext(
  {} as ReturnType<typeof useWorkCategory>
);
