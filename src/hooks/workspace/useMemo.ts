import { useQuery } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { getMemoList } from "@/utils/APIs/memo";

export function useMemo() {
  const { data, error, isLoading } = useQuery({
    queryKey: memoQueryKeys.memoList(),
    queryFn: getMemoList,
  });

  return { data, error, isLoading };
}
