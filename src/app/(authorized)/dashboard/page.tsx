'use client';
import { MainContainer } from '@/styles';
import { useLogin } from '@/stores/useLogin';
import useDashboardData from '@/hooks/dashboard/useDashboardData';

export default function Dashboard() {
  const user = useLogin((state) => state.user)!;
  const { workStudio, error, isLoading } = useDashboardData();


  return (
    <>
      <MainContainer>
        <h1>대시보드</h1>
        <p>{user.displayName}님 환영합니다!</p>
        {isLoading && <p>로딩중...</p>}
        {error && <p>에러가 발생했습니다.</p>}
        {workStudio && (
          <div>
            <h2>작업실</h2>
            <ul>
              {workStudio.map((work,i) => (
                <li key={i+1}>
                  <div>{work.work_name}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MainContainer>
    </>
  );
}
