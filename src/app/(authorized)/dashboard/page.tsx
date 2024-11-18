"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/WorkList";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/WorkList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Dashboard() {
  return (
    <TitleAndWorkListContainer>
      <ReactQueryDevtools />
      <WorkStudioTitleAndNavigationBar />
      <WorkList />
    </TitleAndWorkListContainer>
  );
}
