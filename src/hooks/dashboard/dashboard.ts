import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getWorkStudio,
  addWorkStudio,
  deleteWork,
} from "@/utils/APIs/dashboard";
import { createContext, use, useEffect, useState } from "react";
import { ideaBoxCategory, workspaceCategory } from "@/utils/APIs/types";
import { usePathname } from "next/navigation";

export function useDashboardData() {
  const queryClient = useQueryClient();

  const [workCategory, setWorkCategory] = useState<
    keyof typeof workspaceCategory
  >(() => {
    if (typeof window !== "undefined") {
      const category = localStorage.getItem("workCategory");
      return category
        ? (category as keyof typeof workspaceCategory)
        : "ongoing";
    }
    return "ongoing";
  });
  function handleWorkCategoryChange(category: keyof typeof workspaceCategory) {
    setWorkCategory(category);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("workCategory", workCategory);
    }
  }, [workCategory]);

  // pathname이 변경될 때마다 필요시 workCategory 변경 => 애초에 이렇게 하는게 최선인지 조금 의문이 들긴 함.
  const pathname = usePathname();
  useEffect(() => {
    const handleWorkCategory = () => {
      if (
        pathname === "/dashboard" &&
        workCategory === workspaceCategory.trash
      ) {
        setWorkCategory("ongoing");
      } else if (pathname === "/dashboard/trash") {
        setWorkCategory("trash");
      }
    };
    console.log(pathname, workCategory);
    handleWorkCategory();
  }, [pathname, workCategory]);

  const [isKebabMenuOpenWork, setIsKebabMenuOpenWork] = useState("");
  function handleKebabMenuOpenWork(work_id: string) {
    setIsKebabMenuOpenWork((prev) => (prev === work_id ? "" : work_id));
  }

  const [isEditing, setIsEditing] = useState("");
  function handleEditing(work_id: string) {
    setIsEditing((prev) => (prev === work_id ? "" : work_id));
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [dashboardQueryKeys.workStudio(), workCategory],
    queryFn: getWorkStudio(workCategory),
  });

  const { mutate: addWorkspace, isPending: isAdding } = useMutation({
    mutationFn: addWorkStudio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
    },
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState("");

  const { mutate: onDeleteWork } = useMutation({
    mutationFn: (workId: string) => deleteWork(workId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      refetch();
    },
  });

  return {
    workCategory,
    handleWorkCategoryChange,
    isKebabMenuOpenWork,
    handleKebabMenuOpenWork,
    isEditing,
    handleEditing,
    data,
    error,
    isLoading,
    refetch,
    addWorkspace,
    isAdding,
    openDeleteModal,
    setOpenDeleteModal,
    onDeleteWork,
    isDeleting,
    setIsDeleting,
  };
}

export const DashboardContext = createContext(
  {} as ReturnType<typeof useDashboardData>
);
