import { TFolder, TPlot, TWorkInfo } from "../types";
import axiosInstance from "../axiosInstance";

const mockFolderList: TFolder = {
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
        },{
          isFolder: true,
          folder_name: "폴로 더위사냥",
          files: [
            {
              isFolder: false,
              _id: "5",
              file_name: "플롯1",
              isPinned: false,
            },
            {
              isFolder: false,
              _id: "6",
              file_name: "플롯2",
              isPinned: false,
            },
          ]
        }
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

export const getPlotFolderListMock = (workId: string) => async ()=> {
  //deep copy
  return JSON.parse(JSON.stringify(mockFolderList));
}

export const getChapterListMock = (workId: string) => async () => {
  const response = await axiosInstance.get<TPlot>(`/api/works/${workId}/plots`);
  return response.data;
}

export const updatePlotFolderMock = async ({folder}:{workId: string, folder:TFolder}) => {
  mockFolderList.files = folder.files;
}

const mockInfo: TWorkInfo = {
  cover: "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  title: "",
  genre: "",
  logline: "",
  expected_quantity: -1,
  grade: null,
  introduction: "",
  keyword: [],
}

export const getInfoMock = (workId: string) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return JSON.parse(JSON.stringify(mockInfo)) as TWorkInfo;
}

const generateUpdateInfoMock = <T extends keyof TWorkInfo>(key:T) => (workId: string) => async (value: TWorkInfo[T]) => {
  console.log(key, value);
  mockInfo[key] = value;
}

export const updateTitleMock = generateUpdateInfoMock("title");
export const updateGenreMock = generateUpdateInfoMock("genre");
export const updateLoglineMock = generateUpdateInfoMock("logline");
export const updateExpectedQuantityMock = generateUpdateInfoMock("expected_quantity");
export const updateIntroductionMock = generateUpdateInfoMock("introduction");
export const addKeywordMock = (workId: string) => async (keyword: string) => {
  if(mockInfo.keyword.includes(keyword)) return;
  mockInfo.keyword.push(keyword);
}

export const removeKeywordMock = (workId: string) => async (keyword: string) => {
  mockInfo.keyword = mockInfo.keyword.filter((k) => k !== keyword);
}
export const updateCoverImageMock = (workId: string) => async (file: File) => {
  await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      mockInfo.cover = e.target?.result as string;
      resolve(null);
    }
    reader.readAsDataURL(file);
  });
}
