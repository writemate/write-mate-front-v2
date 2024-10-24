"use client";
import { MainContainer } from "@/styles";
import { useLogin } from "@/stores/useLogin";
import useDashboardData from "@/hooks/dashboard/useDashboardData";
import Link from "next/link";

export default function Dashboard() {
  const user = useLogin((state) => state.user)!;
  const { data, mutate, error, isLoading, isAdding } = useDashboardData();

  return (
    <MainContainer>
      <h1>아이디어 보관함</h1>
    </MainContainer>
  );
}
