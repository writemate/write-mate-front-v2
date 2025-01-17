import { getUsage } from "@/utils/APIs/dashboard";
import { getUserInfo } from "@/utils/APIs/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export function useMyPage() {
  const [isOpenMyPage, setIsOpenMyPage] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const { data: usage } = useQuery({
    queryKey: ["usage"],
    queryFn: getUsage,
  });

  const onClickMyPage = () => {
    setIsOpenMyPage(true);
  };

  const closeModal = () => {
    setIsOpenMyPage(false);
  };

  return {
    user,
    usage,
    isOpenMyPage,
    setIsOpenMyPage,
    onClickMyPage,
    closeModal,
  };
}

export const MyPageContext = createContext({} as ReturnType<typeof useMyPage>);
