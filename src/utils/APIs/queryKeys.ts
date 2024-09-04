import { all } from "axios"

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  workStudio:() => [...dashboardQueryKeys.all, 'workStudio'] as const,
  ideaBox: () => [...dashboardQueryKeys.all, 'ideaBox'] as const,
  memo: () => [...dashboardQueryKeys.ideaBox(), 'memo'] as const,
  character: () => [...dashboardQueryKeys.ideaBox(), 'character'] as const,
  event: () => [...dashboardQueryKeys.ideaBox(), 'event'] as const,
  trash: () => [...dashboardQueryKeys.all, 'trash'] as const,
}

export const userQueryKeys = {
  all: ['user'] as const,
}

export const workspaceQueryKeys = {
  all: ['workspace'] as const,
  work: (id:string) => [...workspaceQueryKeys.all, 'work', id] as const,
  sidebar: () => [...workspaceQueryKeys.all, 'sidebar'] as const,
  plotSidebar: () => [...workspaceQueryKeys.sidebar(), 'plot'] as const,
  characterSidebar: () => [...workspaceQueryKeys.sidebar(), 'character'] as const,
  scriptSidebar: () => [...workspaceQueryKeys.sidebar(), 'event'] as const,
}
