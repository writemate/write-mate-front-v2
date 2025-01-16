import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getWork } from "@/utils/APIs/workspace";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPlotInfo } from "@/utils/APIs/workspace/plot";
import { getScriptInfo } from "@/utils/APIs/workspace/script";
import { getCharacter } from "@/utils/APIs/workspace/character";

export default function useWorkspaceHeader() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const {
    data: work,
    error: workError,
    isLoading: workIsLoading,
  } = useQuery({
    queryKey: workspaceQueryKeys.workName(workspace_id),
    queryFn: getWork(workspace_id),
  });

  const [plot_id, setPlotId] = useState("");
  const { data: plot } = useQuery({
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    queryFn: getPlotInfo(plot_id),
  });

  const [script_id, setScriptId] = useState("");
  const { data: script } = useQuery({
    queryKey: workspaceQueryKeys.script(workspace_id, script_id),
    queryFn: getScriptInfo(script_id),
  });

  const [character_id, setCharacterId] = useState("");
  const { data: character } = useQuery({
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    queryFn: getCharacter(workspace_id, character_id),
  });

  // 버전 관리 모달
  const [isOpenVersionControl, setIsOpenVersionControl] = useState(false);
  const onClickVersionControl = () => {
    setIsOpenVersionControl((prev) => !prev);
  };
  const closeVersionControl = () => {
    setIsOpenVersionControl(false);
  };

  // 현재 pathname 확인
  const currentPathList = usePathname().split("/");
  const [subTitle, setSubTitle] = useState("");
  useEffect(() => {
    if (currentPathList[2] === "info") {
      setSubTitle("작품 정보");
    } else if (currentPathList[2] === "plot") {
      setPlotId(currentPathList[3]);
      setSubTitle(plot?.plot_name ?? "플롯");
    } else if (currentPathList[2] === "script") {
      setScriptId(currentPathList[3]);
      setSubTitle(script?.script_name ?? "스크립트");
    } else if (currentPathList[2] === "character") {
      if (!currentPathList[3]) {
        setSubTitle("캐릭터 목록");
      } else {
        setCharacterId(currentPathList[3]);
        setSubTitle(character?.ch_name ?? "캐릭터");
      }
    }
  }, [currentPathList]);

  return {
    work,
    subTitle,
    workError,
    workIsLoading,
    isOpenVersionControl,
    onClickVersionControl,
    closeVersionControl,
  };
}
