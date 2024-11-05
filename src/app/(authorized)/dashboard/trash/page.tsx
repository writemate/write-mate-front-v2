"use client";
import { useLogin } from "@/stores/useLogin";
import { TitleAndWorkListContainer } from "@/styles/dashboard/WorkList";
import { TrashTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/WorkList";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Dashboard() {
  const user = useLogin((state) => state.user)!;
  const [isInProgress, setIsInProgress] = useState("작품");

  return (
    <TitleAndWorkListContainer>
      <ReactQueryDevtools />
      <TrashTitleAndNavigationBar
        isInProgress={isInProgress}
        setIsInProgress={setIsInProgress}
      />
      <WorkList isInProgress={isInProgress} />
    </TitleAndWorkListContainer>
  );
}
