import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getWorkStudio,
  addWorkStudio,
  deleteWork,
} from "@/utils/APIs/dashboard";
import { createContext, useEffect, useState } from "react";
import { workspaceCategory } from "@/utils/APIs/types";
import { usePathname } from "next/navigation";
import useToast from "@/hooks/useToastNotification";

export function useDashboardData() {
  const { notifyPositive } = useToast();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const [isKebabMenuOpenWork, setIsKebabMenuOpenWork] = useState(""); // 어떤 케밥이 열려있는지 확인용
  const [isEditing, setIsEditing] = useState(""); // 어떤 작품이 수정중인지 확인용
  const [isDeleting, setIsDeleting] = useState(""); // 어떤 작품이 삭제중인지 확인용
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 삭제 모달 오픈 여부
  const [isPermanentDelete, setIsPermanentDelete] = useState(false); // 영구 삭제 여부
  const [workCategory, setWorkCategory] = useState<
    // 작품 카테고리
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
  const { data, error, isLoading } = useQuery({
    queryKey: [dashboardQueryKeys.workStudio(), workCategory],
    queryFn: getWorkStudio(workCategory),
  });
  const { mutate: onClickAddWorkspace, isPending: isAdding } = useMutation({
    mutationFn: addWorkStudio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifyPositive("작품이 추가되었습니다.");
    },
  });
  const { mutate: onDeleteWork } = useMutation({
    mutationFn: (workId: string) => deleteWork(workId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifyPositive("작품이 삭제되었습니다.");
    },
  });

  function handleWorkCategoryChange(category: keyof typeof workspaceCategory) {
    setWorkCategory(category);
  }
  function handleKebabMenuOpenWork(work_id: string) {
    setIsKebabMenuOpenWork((prev) => (prev === work_id ? "" : work_id));
  }
  function handleEditing(work_id: string) {
    setIsEditing((prev) => (prev === work_id ? "" : work_id));
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("workCategory", workCategory);
    }
  }, [workCategory]);
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
    handleWorkCategory();
  }, [pathname, workCategory]);

  return {
    workCategory,
    data,
    error,
    isEditing,
    isKebabMenuOpenWork,
    isDeleting,
    isLoading,
    isAdding,
    isPermanentDelete,
    openDeleteModal,
    handleWorkCategoryChange,
    handleKebabMenuOpenWork,
    handleEditing,
    onClickAddWorkspace,
    setOpenDeleteModal,
    setIsDeleting,
    setIsPermanentDelete,
    onDeleteWork,
  };
}

export const DashboardContext = createContext(
  {} as ReturnType<typeof useDashboardData>
);
