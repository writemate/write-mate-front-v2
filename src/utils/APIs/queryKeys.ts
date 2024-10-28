
import { all } from "axios";
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
};

export const workspaceQueryKeys = {
  all: ['workspace'] as const,
  workName: (id:string) => [...workspaceQueryKeys.all, id] as const,

  sidebar: (id:string) => [...workspaceQueryKeys.all, 'sidebar',id] as const,
  plotSidebar: (id:string) => [...workspaceQueryKeys.sidebar(id), 'plot'] as const,
  scriptSidebar: (id:string) => [...workspaceQueryKeys.sidebar(id), 'event'] as const,

  info: (id:string) => [...workspaceQueryKeys.all, 'info', id] as const,
  mainCharacter: (id:string) => [...workspaceQueryKeys.info(id), 'mainCharacter'] as const,
  mainPlot: (id:string) => [...workspaceQueryKeys.info(id), 'mainPlot'] as const,

  character: (id:string) => [...workspaceQueryKeys.all, 'character', id] as const,
  characterList: (id:string) => [...workspaceQueryKeys.character(id), 'list'] as const,
  characterKeywordList: (id:string) => [...workspaceQueryKeys.character(id), 'keyword'] as const,
  characterDetail: (id:string, characterId:string) => [...workspaceQueryKeys.character(id), characterId] as const,
  characterRelation: (id:string) => [...workspaceQueryKeys.character(id), 'relation'] as const,
}

export const memoQueryKeys = {
  all: ['memo'] as const,
  memoList: () => [...memoQueryKeys.all, 'memoList'] as const,
  memoCharacterList: () => [...memoQueryKeys.all, 'memoCharacterList'] as const,
}
