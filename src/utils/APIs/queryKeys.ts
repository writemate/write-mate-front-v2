export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  workStudio:() => [...dashboardQueryKeys.all, 'workStudio'] as const,
  ideaBox: () => [...dashboardQueryKeys.all, 'ideaBox'] as const,
  memo: () => [...dashboardQueryKeys.ideaBox(), 'memo'] as const,
  character: () => [...dashboardQueryKeys.ideaBox(), 'character'] as const,
  event: () => [...dashboardQueryKeys.ideaBox(), 'event'] as const,
  trash: () => [...dashboardQueryKeys.all, 'trash'] as const,
}
