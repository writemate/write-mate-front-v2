import { useQuery } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { getMemoCharacterList } from "@/utils/APIs/memo";

export function useMemo() {
  const { data, error, isLoading } = useQuery({
    queryKey: memoQueryKeys.memoCharacterList(),
    queryFn: getMemoCharacterList,
  });

  return { data, error, isLoading };
}
