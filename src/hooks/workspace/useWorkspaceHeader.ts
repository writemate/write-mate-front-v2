import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getScript, getWork } from "@/utils/APIs/workspace";
import { useParams, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getPlotInfo } from "@/utils/APIs/workspace/plot";
import { getCharacter } from "@/utils/APIs/workspace/character";
import { TCharacter, TPlot, TScript, TWork } from "@/utils/APIs/types";
import { WorkspaceLayoutContext } from "./useWorkspaceLayout";
import { get } from "http";

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
    queryFn: getScript(script_id),
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

  // Header Link List
  const [headerLinkList, setHeaderLinkList] = useState(
    [] as { title: string; link: string; onClick: () => void }[]
  );

  const currentPathList = usePathname().split("/");

  const setInfoPageHeader = () => {
    if (!work) return;
    setHeaderLinkList(() => [
      {
        title: `${getWorkTitle(work)}`,
        link: `/${workspace_id}/info`,
        onClick: () => {},
      },
      {
        title: "작품 정보",
        link: `/${workspace_id}/info`,
        onClick: () => ({}),
      },
    ]);
  };

  const { togglePlot } = useContext(WorkspaceLayoutContext);
  const setPlotPageHeader = () => {
    if (!work || !plot) return;
    setHeaderLinkList(() => [
      {
        title: `${getWorkTitle(work)}`,
        link: `/${workspace_id}/info`,
        onClick: () => {},
      },
      {
        title: `${getPlotName(plot)}`,
        link: ``,
        onClick: togglePlot,
      },
    ]);
  };

  const { toggleScript } = useContext(WorkspaceLayoutContext);
  const setScriptPageHeader = () => {
    if (!work || !script) return;
    setHeaderLinkList(() => [
      {
        title: `${getWorkTitle(work)}`,
        link: `/${workspace_id}/info`,
        onClick: () => ({}),
      },
      {
        title: `${getScriptName(script)}`,
        link: ``,
        onClick: toggleScript,
      },
    ]);
  };

  const setCharacterListPageHeader = () => {
    if (!work) return;
    setHeaderLinkList(() => [
      {
        title: `${getWorkTitle(work)}`,
        link: `/${workspace_id}/info`,
        onClick: () => ({}),
      },
      {
        title: "캐릭터 목록",
        link: `/${workspace_id}/character`,
        onClick: () => ({}),
      },
    ]);
  };

  const setCharacterPageHeader = () => {
    if (!work || !character) return;
    setHeaderLinkList(() => [
      {
        title: `${getWorkTitle(work)}`,
        link: `/${workspace_id}/info`,
        onClick: () => ({}),
      },
      {
        title: `${getCharacterName(character)}`,
        link: `/${workspace_id}/character/`,
        onClick: () => ({}),
      },
    ]);
  };

  useEffect(() => {
    if (!currentPathList[2]) return;

    const pathType = currentPathList[2];
    const id = currentPathList[3];

    setPlotId("");
    setScriptId("");
    setCharacterId("");

    if (pathType === "plot") setPlotId(id);
    else if (pathType === "script") setScriptId(id);
    else if (pathType === "character" && !id) setCharacterId("");
    else if (pathType === "character" && id) setCharacterId(id);
    else {
      setPlotId("");
      setScriptId("");
      setCharacterId("");
    }
  }, [currentPathList]);

  useEffect(() => {
    if (!work) return;
    const pathType = currentPathList[2];

    const headers = {
      info: () => setInfoPageHeader(),
      plot: () => plot && setPlotPageHeader(),
      script: () => script && setScriptPageHeader(),
      character: () =>
        currentPathList[3]
          ? character && setCharacterPageHeader()
          : setCharacterListPageHeader(),
    };

    headers[pathType as keyof typeof headers]?.();
  }, [work, currentPathList[2], plot, script, character]);

  return {
    headerLinkList,
    workIsLoading,
    isOpenVersionControl,
    onClickVersionControl,
    closeVersionControl,
  };
}

const getWorkTitle = (work: TWork) => {
  const DEFAULT_WORK_TITLE = "무제";

  if (!work) return DEFAULT_WORK_TITLE;
  if (work.title === "" || !work.title) {
    return DEFAULT_WORK_TITLE;
  } else if (work.title.length > 10) {
    return `${work.title.slice(0, 10)}...`;
  }
  return work.title;
};

const getPlotName = (plot: TPlot) => {
  const DEFAULT_PLOT_NAME = "새 플롯";

  if (!plot) return DEFAULT_PLOT_NAME;
  if (plot.plot_name === "" || !plot.plot_name) {
    return DEFAULT_PLOT_NAME;
  } else if (plot.plot_name.length > 10) {
    return `${plot.plot_name.slice(0, 10)}...`;
  }
  return plot.plot_name;
};

const getCharacterName = (character: TCharacter) => {
  const DEFAULT_CHARACTER_NAME = "새 인물";

  if (!character) return DEFAULT_CHARACTER_NAME;
  if (character.ch_name === "" || !character.ch_name) {
    return DEFAULT_CHARACTER_NAME;
  } else if (character.ch_name.length > 10) {
    return `${character.ch_name.slice(0, 10)}...`;
  }
  return character.ch_name;
};

const getScriptName = (script: TScript) => {
  const DEFAULT_SCRIPT_NAME = "새 원고";

  if (!script) return DEFAULT_SCRIPT_NAME;
  if (script.script_name === "" || !script.script_name) {
    return DEFAULT_SCRIPT_NAME;
  } else if (script.script_name.length > 10) {
    return `${script.script_name.slice(0, 10)}...`;
  }
  return script.script_name;
};

//토글 동작 이상함
