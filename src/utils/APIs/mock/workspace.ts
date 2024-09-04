import { TFolder, TPlot } from "../types";
import axiosInstance from "../axiosInstance";

export const getPlotFolderListMock = async (workId: string): Promise<TFolder> => {
  return {
    isFolder: true,
    folder_name: "플롯",
    files: [
      {
        isFolder: true,
        folder_name: "폴란드 더벅머리",
        files: [
          {
            isFolder: false,
            _id: "1",
            file_name: "플로리다의 롯데호텔에서",
            isPinned: false,
          },
          {
            isFolder: false,
            _id: "2",
            file_name: "플레이보이가 롯폰기에서",
            isPinned: false,
          },
        ]
      },
      {
        isFolder: false,
        _id: "3",
        file_name: "플래티넘 롯데리아버거",
        isPinned: false,
      },
      {
        isFolder: false,
        _id: "4",
        file_name: "플라토닉러브로 롯데인수하기",
        isPinned: false,
      },
    ]
  };
}

export const getChapterListMock = async (workId: string) => {
  const response = await axiosInstance.get<TPlot>(`/api/works/${workId}/plots`);
  return response.data;
}
