import {
  TCharacter,
  TFolder,
  TKeyword,
  TPlot,
  TWorkInfo,
  TRelation,
} from "../types";
import axiosInstance from "../axiosInstance";
import { colorSystem } from "@/styles/colorSystem";

const mockPlotFolderList: TFolder = {
  isFolder: true,
  folder_name: "플롯",
  files: [
    {
      isFolder: true,
      folder_name: "폴란드 더벅머리",
      files: [
        {
          isFolder: false,
          id: "1",
          file_name: "플로리다의 롯데호텔에서",
          isPinned: false,
        },
        {
          isFolder: false,
          id: "2",
          file_name: "플레이보이가 롯폰기에서",
          isPinned: false,
        },
        {
          isFolder: true,
          folder_name: "폴로 더위사냥",
          files: [
            {
              isFolder: false,
              id: "5",
              file_name: "플롯1",
              isPinned: false,
            },
            {
              isFolder: false,
              id: "6",
              file_name: "플롯2",
              isPinned: false,
            },
          ],
        },
      ],
    },
    {
      isFolder: false,
      id: "3",
      file_name: "플래티넘 롯데리아버거",
      isPinned: false,
    },
    {
      isFolder: false,
      id: "4",
      file_name: "플라토닉러브로 롯데인수하기",
      isPinned: false,
    },
  ],
};

export const getPlotFolderListMock = (workId: string) => async () => {
  //deep copy
  return JSON.parse(JSON.stringify(mockPlotFolderList));
};

export const getChapterListMock = (workId: string) => async () => {
  const response = await axiosInstance.get<TPlot>(`/api/works/${workId}/plots`);
  return response.data;
};

export const updatePlotFolderMock = async ({
  folder,
}: {
  workId: string;
  folder: TFolder;
}) => {
  mockPlotFolderList.files = folder.files;
};

export const createPlotMock = (workId: string) => async () => {
  return Math.random().toString(36).substring(7);
};

const mockScriptFolderList: TFolder = {
  isFolder: true,
  folder_name: "원고",
  files: [
    {
      isFolder: true,
      folder_name: "폴라로이드 사진 속의 더위",
      files: [
        {
          isFolder: false,
          id: "1",
          file_name: "원치 않았던 고백",
          isPinned: false,
        },
        {
          isFolder: false,
          id: "2",
          file_name: "원숭이도 고장날 때가 있다",
          isPinned: false,
        },
        {
          isFolder: true,
          folder_name: "폴리우레탄을 더듬다",
          files: [
            {
              isFolder: false,
              id: "5",
              file_name: "원고1",
              isPinned: false,
            },
            {
              isFolder: false,
              id: "6",
              file_name: "원고2",
              isPinned: false,
            },
          ],
        },
      ],
    },
    {
      isFolder: false,
      id: "3",
      file_name: "원하는 만큼, 고지식하게",
      isPinned: false,
    },
    {
      isFolder: false,
      id: "4",
      file_name: "원더풀 고양이",
      isPinned: false,
    },
  ],
};

export const getScriptFolderListMock = (workId: string) => async () => {
  //deep copy
  return JSON.parse(JSON.stringify(mockScriptFolderList));
};

export const updateScriptFolderMock = async ({
  folder,
}: {
  workId: string;
  folder: TFolder;
}) => {
  mockScriptFolderList.files = folder.files;
};

export const createScriptMock = (workId: string) => async () => {
  return Math.random().toString(36).substring(7);
};

const mockInfo: TWorkInfo = {
  cover:
    "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  title: "",
  genre: "",
  logline: "",
  expected_quantity: -1,
  grade: null,
  introduction: "",
  mainPlot: null,
};

export const getInfoMock = (workId: string) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return JSON.parse(JSON.stringify(mockInfo)) as TWorkInfo;
};

const generateUpdateInfoMock =
  <T extends keyof TWorkInfo>(key: T) =>
  (workId: string) =>
  async (value: TWorkInfo[T]) => {
    console.log(key, value);
    mockInfo[key] = value;
  };

export const updateTitleMock = generateUpdateInfoMock("title");
export const updateGenreMock = generateUpdateInfoMock("genre");
export const updateLoglineMock = generateUpdateInfoMock("logline");
export const updateExpectedQuantityMock =
  generateUpdateInfoMock("expected_quantity");
export const updateGradeMock = generateUpdateInfoMock("grade");
export const updateIntroductionMock = generateUpdateInfoMock("introduction");
export const updateCoverImageMock = (workId: string) => async (file: File) => {
  await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      mockInfo.cover = e.target?.result as string;
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
};

const mockKeywordList: TKeyword[] = [
  {
    id: "1",
    word: "주연",
    light_color: colorSystem.red200,
    dark_color: colorSystem.red600,
  },
  {
    id: "2",
    word: "중립",
    light_color: colorSystem.orange200,
    dark_color: colorSystem.orange500,
  },
  {
    id: "3",
    word: "빌런",
    light_color: colorSystem.blue200,
    dark_color: colorSystem.blue500,
  },
  {
    id: "4",
    word: "알고보면 착한 빌런",
    light_color: colorSystem.green200,
    dark_color: colorSystem.green500,
  },
  {
    id: "5",
    word: "바보",
    light_color: colorSystem.purple200,
    dark_color: colorSystem.purple500,
  },
  {
    id: "6",
    word: "호라 모 젠젠 라인",
    light_color: colorSystem.darkYellow200,
    dark_color: colorSystem.darkYellow600,
  },
  {
    id: "7",
    word: "콩라인",
    light_color: colorSystem.green200,
    dark_color: colorSystem.green500,
  },
  {
    id: "8",
    word: "츤데레",
    light_color: colorSystem.red200,
    dark_color: colorSystem.red500,
  },
  {
    id: "9",
    word: "설명충",
    light_color: colorSystem.orange200,
    dark_color: colorSystem.orange500,
  },
  {
    id: "10",
    word: "집착",
    light_color: colorSystem.darkYellow200,
    dark_color: colorSystem.darkYellow600,
  },
  {
    id: "11",
    word: "열혈",
    light_color: colorSystem.green200,
    dark_color: colorSystem.green500,
  },
  {
    id: "12",
    word: "갭모에",
    light_color: colorSystem.blue200,
    dark_color: colorSystem.blue500,
  },
  {
    id: "13",
    word: "금태양",
    light_color: colorSystem.purple200,
    dark_color: colorSystem.purple500,
  },
  {
    id: "14",
    word: "병약",
    light_color: colorSystem.red200,
    dark_color: colorSystem.red500,
  },
];

const mockCharacterList: TCharacter[] = [
  {
    id: "1",
    ch_name: "주인공",
    ch_image: "",
    isMain: true,
    role: "주인공",
    birthday: "",
    gender: "",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
    characteristic: [],
    keyword: [],
    relatedEvent: [],
  },
  {
    id: "2",
    ch_name: "ㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    isMain: true,
    role: "주인공ㄴㅇㄹㅎㅇㄹㄴㅇㄹ허ㅏㅣㅠㅜㄴㅇㄹㅎ허ㅏㅣㅜㄴㅇ",
    birthday: "",
    gender: "",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
    characteristic: [],
    keyword: [],
    relatedEvent: [],
  },
  {
    id: "3",
    ch_name: "ㄷㅅㄹㅎㅇㅍㅇㄹㅍ",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    isMain: true,
    role: "ㄴㅇㄹㄴㅇ륭ㅅ롯ㅇㄹ혹ㄴㅇㅎㄷㄱㅇㅎㅇㄹ퓨",
    birthday: "",
    gender: "",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
    characteristic: [],
    keyword: [],
    relatedEvent: [],
  },
  {
    id: "4",
    ch_name: "ㅇ롱ㄹ혿ㄱ욯ㅇㄹ퓽류",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    isMain: true,
    role: "ㅎㄱㄴㅎㄱㅇㄹㅍㄷㄱㅎㄹㅇㅍㅇ퓨",
    birthday: "",
    gender: "",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
    characteristic: [],
    keyword: [],
    relatedEvent: [],
  },
];

export const getCharacterKeywordListMock =
  (workspaceid: string) => async () => {
    return JSON.parse(JSON.stringify(mockKeywordList)) as TKeyword[];
  };

export const getCharacterListMock = (workspaceid: string) => async () => {
  return JSON.parse(JSON.stringify(mockCharacterList)) as TCharacter[];
};

export const createCharacterKeywordMock =
  (workspaceid: string) =>
  async ({
    word,
    light_color,
    dark_color,
  }: {
    word: string;
    light_color?: string;
    dark_color?: string;
  }) => {
    const randomColorList = [
      [
        colorSystem.red200,
        colorSystem.orange200,
        colorSystem.blue200,
        colorSystem.green200,
        colorSystem.purple200,
        colorSystem.darkYellow200,
      ],
      [
        colorSystem.red500,
        colorSystem.orange500,
        colorSystem.blue500,
        colorSystem.green500,
        colorSystem.purple500,
        colorSystem.darkYellow600,
      ],
    ];

    if (light_color === undefined)
      light_color =
        randomColorList[0][
          Math.floor(Math.random() * randomColorList[0].length)
        ];
    if (dark_color === undefined)
      dark_color =
        randomColorList[1][
          Math.floor(Math.random() * randomColorList[1].length)
        ];
    mockKeywordList.push({
      id: Math.random().toString(36).substring(7),
      word,
      light_color,
      dark_color,
    });
  };

export const createCharacterMock = (workspaceid: string) => async () => {
  mockCharacterList.push({
    id: Math.random().toString(36).substring(7),
    ch_name: "새인물",
    ch_image: "",
    isMain: false,
    role: "",
    birthday: "",
    gender: "",
    description: "",
    characteristic: [],
    keyword: [],
    relatedEvent: [],
  });
};

export const deleteCharacterKeywordMock =
  (workspaceid: string) => async (keywordid: string) => {
    const index = mockKeywordList.findIndex((k) => k.id === keywordid);
    if (index === -1) return;
    mockKeywordList.splice(index, 1);
  };

export const deleteCharacterMock =
  (workspaceid: string, characterid: string) => async () => {
    const index = mockCharacterList.findIndex((c) => c.id === characterid);
    if (index === -1) return;
    mockCharacterList.splice(index, 1);
  };

export const getCharacterMock =
  (workspaceid: string, characterid: string) => async () => {
    return JSON.parse(
      JSON.stringify(mockCharacterList.find((c) => c.id === characterid))
    ) as TCharacter;
  };

const generateUpdateCharacterMock =
  <T extends keyof TCharacter>(key: T) =>
  (workspaceid: string, characterid: string) =>
  async (value: TCharacter[T]) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character[key] = value;
  };

export const updateCharacterNameMock = generateUpdateCharacterMock("ch_name");
export const updateCharacterRoleMock = generateUpdateCharacterMock("role");
export const updateCharacterGenderMock = generateUpdateCharacterMock("gender");
export const updateCharacterBirthdayMock =
  generateUpdateCharacterMock("birthday");
export const updateCharacterDescriptionMock =
  generateUpdateCharacterMock("description");

export const setMainCharacterMock =
  (workspaceid: string) => async (characterid: string) => {
    generateUpdateCharacterMock("isMain")(workspaceid, characterid)(true);
  };

export const removeMainCharacterMock =
  (workspaceid: string) => async (characterid: string) => {
    generateUpdateCharacterMock("isMain")(workspaceid, characterid)(false);
  };

export const updateCharacterCoverImageMock =
  (workspaceid: string, characterid: string) => async (file: File) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        character.ch_image = e.target?.result as string;
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  };

export const addCharacterKeywordMock =
  (workspaceid: string, characterid: string) => async (keywordid: string) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    //character.keyword.push(keywordid);
  };

export const removeCharacterKeywordMock =
  (workspaceid: string, characterid: string) => async (keywordid: string) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character.keyword = character.keyword.filter((k) => k.id !== keywordid);
  };

export const addCharacterCharacteristicMock =
  (workspaceid: string, characterid: string) => async () => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character.characteristic.push({ title: "", content: "" });
  };

export const updateCharacterCharacteristicTitleMock =
  (workspaceid: string, characterid: string) =>
  async ({ index, title }: { index: number; title: string }) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character.characteristic[index].title = title;
  };

export const updateCharacterCharacteristicContentMock =
  (workspaceid: string, characterid: string) =>
  async ({ index, content }: { index: number; content: string }) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character.characteristic[index].content = content;
  };

export const removeCharacterCharacteristicMock =
  (workspaceid: string, characterid: string) => async (index: number) => {
    const character = mockCharacterList.find((c) => c.id === characterid);
    if (!character) return;
    character.characteristic.splice(index, 1);
  };

const CharacterRelationMock: TRelation[] = [
  {
    id: "1",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "2",
  },
  {
    id: "2",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "3",
  },
  {
    id: "3",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "4",
  },
  {
    id: "4",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "2",
    end_ch: "3",
  },
  {
    id: "5",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "2",
    end_ch: "4",
  },
  {
    id: "6",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "3",
    end_ch: "4",
  },
];

export const getCharacterRelationMock = (workspaceid: string) => async () => {
  return JSON.parse(JSON.stringify(CharacterRelationMock)) as TRelation[];
};

export const createCharacterRelationMock =
  (workspaceid: string) =>
  async ({
    arrow_text_right,
    arrow_text_left,
    start_ch,
    end_ch,
  }: {
    arrow_text_right: string;
    arrow_text_left: string;
    start_ch: string;
    end_ch: string;
  }) => {
    CharacterRelationMock.push({
      id: Math.random().toString(36).substring(7),
      arrow_right: true,
      arrow_left: true,
      arrow_text_right,
      arrow_text_left,
      start_ch,
      end_ch,
    });
  };

export const deleteCharacterRelationMock =
  (workspaceid: string) => async (relationid: string) => {
    const index = CharacterRelationMock.findIndex((r) => r.id === relationid);
    if (index === -1) return;
    CharacterRelationMock.splice(index, 1);
  };

export const updateCharacterRelationMock =
  (workspaceid: string) =>
  async ({
    relationid,
    arrow_text_right,
    arrow_text_left,
  }: {
    relationid: string;
    arrow_text_right: string;
    arrow_text_left: string;
  }) => {
    const relation = CharacterRelationMock.find((r) => r.id === relationid);
    if (!relation) return;
    relation.arrow_text_right = arrow_text_right;
    relation.arrow_text_left = arrow_text_left;
  };
