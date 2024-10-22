export const DOMAIN = {
  GET_WORKLIST: (category: "before"|"ongoing"|"delete") => `/api/works?category=${category}`,
  CREATE_WORK: "/api/works",
  GET_WORK: (workId: string) => `/api/works/${workId}`,

  GET_PLOT: (workId: string) => `/api/works/${workId}/plots`,

  CREATE_CHAPTER: (plotId: string) => `/api/plots/${plotId}/plots`,
  DELETE_CHAPTER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}`,
  UPDATE_CHAPTER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}`,

  CREATE_EVENT: (chapterId: string) => `/api/chapters/${chapterId}/pevents`,
  DELETE_EVENT: (peventId: string) => `/api/pevents/${peventId}`,
  UPDATE_EVENT: (peventId: string) => `/api/pevents/${peventId}`,


};
