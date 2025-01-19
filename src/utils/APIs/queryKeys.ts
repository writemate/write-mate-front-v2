export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  workStudio: () => [...dashboardQueryKeys.all, "workStudio"] as const,
  ideaBox: () => [...dashboardQueryKeys.all, "ideaBox"] as const,
  memo: () => [...dashboardQueryKeys.ideaBox(), "memo"] as const,
  character: () => [...dashboardQueryKeys.ideaBox(), "character"] as const,
  event: () => [...dashboardQueryKeys.ideaBox(), "event"] as const,
  trash: () => [...dashboardQueryKeys.all, "trash"] as const,
};

export const userQueryKeys = {
  all: ["user"] as const,
  profile: () => [...userQueryKeys.all, "profile"] as const,
  usage: () => [...userQueryKeys.all, "usage"] as const,
};

export const workspaceQueryKeys = {
  all: (workId: string) => ["workspace", workId] as const,
  workName: (workId: string) =>
    [...workspaceQueryKeys.all(workId), "name"] as const,

  sidebar: (workId: string) =>
    [...workspaceQueryKeys.all(workId), "sidebar"] as const,
  plotSidebar: (workId: string) =>
    [...workspaceQueryKeys.sidebar(workId), "plot"] as const,
  scriptSidebar: (workId: string) =>
    [...workspaceQueryKeys.sidebar(workId), "event"] as const,

  info: (workId: string) =>
    [...workspaceQueryKeys.all(workId), "info"] as const,
  mainCharacter: (workId: string) =>
    [...workspaceQueryKeys.info(workId), "mainCharacter"] as const,
  mainPlot: (workId: string) =>
    [...workspaceQueryKeys.info(workId), "mainPlot"] as const,

  plot: (workId: string, plotId: string) =>
    [...workspaceQueryKeys.all(workId), "plot", plotId] as const,

  script: (workId: string, scriptId: string) =>
    [...workspaceQueryKeys.all(workId), "script", scriptId] as const,

  character: (workId: string) =>
    [...workspaceQueryKeys.all(workId), "character"] as const,
  characterList: (workId: string) =>
    [...workspaceQueryKeys.character(workId), "list"] as const,
  characterKeywordList: (workId: string) =>
    [...workspaceQueryKeys.character(workId), "keyword"] as const,
  characterDetail: (workId: string, characterId: string) =>
    [...workspaceQueryKeys.character(workId), characterId] as const,
  characterRelation: (workId: string) =>
    [...workspaceQueryKeys.character(workId), "relation"] as const,

  characterModal: (workId: string) =>
    [...workspaceQueryKeys.all(workId)] as const,
};

export const memoQueryKeys = {
  all: ["memo"] as const,
  memoList: () => [...memoQueryKeys.all, "memoList"] as const,
  memoCharacterList: () => [...memoQueryKeys.all, "memoCharacterList"] as const,
};

export const mCharacterQueryKeys = {
  all: (mCharacterId: string) => ["mCharacter", mCharacterId] as const,
};
