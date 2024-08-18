'use client';
import { MainContainer } from '@/styles';
import { useLogin } from '@/stores/useLogin';
import useDashboardData from '@/hooks/dashboard/useDashboardData';
import Link from 'next/link';

export default function Dashboard() {
  const user = useLogin((state) => state.user)!;
  const { data, mutate, error, isLoading, isAdding } = useDashboardData();

  return (
    <MainContainer>
      <h1>대시보드</h1>
      <p>{user.displayName}님 환영합니다!</p>
      {isLoading && <p>로딩중...</p>}
      {error && <p>에러가 발생했습니다.</p>}
      {data && (
        <div>
          <h2>작업실</h2>
          {data.map((work,i) => (
            <Link key={i+1} href={`/${work._id}/info`} passHref>
              <div>{work.work_name}</div>
            </Link>
          ))}
          {isAdding && <p>작업실 추가 중...</p>}
          {!isAdding && (
            <button onClick={() => mutate()}>
              작업실 추가
            </button>
          )}
        </div>
      )}
    </MainContainer>
  );
}
