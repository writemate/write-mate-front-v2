import { deleteWork } from "@/utils/APIs/dashboard";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { notifySuccess } from "@/utils/showToast";

export default function useDeleteModal() {
  const queryClient = useQueryClient();

  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate: onDeleteWork } = useMutation({
    mutationFn: (workId: string) => deleteWork(workId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          dashboardQueryKeys.workStudio(),
          useContext(DashboardContext).workstudioAndTrash.workCategory,
        ],
      });
      notifySuccess("작품이 삭제되었습니다.");
    },
  });

  const onPermanentDeleteWork = () => {
    setIsPermanentDelete(true);
  };

  return {
    selectedWorkForDelete,
    isDeleting,
    isPermanentDelete,
    openDeleteModal,
    setSelectedWorkForDelete,
    onDeleteWork,
    onPermanentDeleteWork,
    setOpenDeleteModal,
    setIsDeleting,
    setIsPermanentDelete,
  };
}
