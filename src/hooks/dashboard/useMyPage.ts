import { getUsage } from "@/utils/APIs/dashboard";
import { userQueryKeys } from "@/utils/APIs/queryKeys";
import { getUserInfo } from "@/utils/APIs/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export function useMyPage() {
  const [isOpenMyPage, setIsOpenMyPage] = useState(false);

  const { data: user } = useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: getUserInfo,
  });

  const { data: usage } = useQuery({
    queryKey: userQueryKeys.usage(),
    queryFn: getUsage,
  });

  const onClickMyPage = () => {
    setIsOpenMyPage(true);
  };

  const closeModal = () => {
    setIsOpenMyPage(false);
  };

  return {
    isOpenMyPage,
    setIsOpenMyPage,
    onClickMyPage,
    closeModal,
    user,
    usage,
  };
}

export const MyPageContext = createContext({} as ReturnType<typeof useMyPage>);
