export interface responseGetPlotType {
  id: string;
  plot_name: string;
  chapters: PlotChapterType[];
}

export interface TPatchUpdateNameRequest {
  chapterId: string;
  chapter_name: string;
}

export interface TPatchUpdateDRequest {
  chapterId: string;
  chapter_description: string;
}

export interface TPatchUpdateORequest {
  chapterId: string;
  pre_idx: number;
  next_idx: number;
}

export interface TPatchUpdateFRequest {
  chapterId: string;
  is_folded: boolean;
}

export type PlotChapterType = {
  id: string;
  autor: string;
  chapter_name: string;
  chapter_description: string;
  work_id: string;
  is_starred: boolean;
  order: number;
  pevent_list: PlotEventType[];
  createdAt: string;
  updatedAt: string;
  is_folded: boolean;
};

export type PlotEventType = {
  id: string;
  event_description: string;
  event_name: string;

  order: number;
  createdAt: string;
  updatedAt: string;
  character_list: PlotCharacterType[];
};

export type PlotCharacterType = {
  id: string;
  ch_image: string;
  ch_name: string;
};

export type CharacterListType = {
  id: string;
  ch_image: string;
  ch_name: string;
  description: string;
  keyword: string[];
};

export const mockCharacterList: CharacterListType[] = [
  {
    id: "string;",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    ch_name: "string;",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "strinddg",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    ch_name: "string;",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string2s",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    ch_name: "이상혁",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "stringd1",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    ch_name: "한태산",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string",
    ch_image: "",
    ch_name: "박성호",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string2",
    ch_image:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
    ch_name: "명재현",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string1",
    ch_image: "",
    ch_name: "김운학",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string1333",
    ch_image: "",
    ch_name: "김동현",
    description: "string;",
    keyword: ["st"],
  },
];

export const mockPlotList: responseGetPlotType = {
  id: "1",
  plot_name: "vfmhjslfl",
  chapters: [
    {
      id: "12",
      autor: "skfsfjkd",
      is_starred: false,
      chapter_name: "사랑",
      chapter_description: "사랑해라",
      work_id: "gkgkgk",
      order: 0,
      pevent_list: [
        {
          id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",

          order: 0,
          createdAt: "string",
          updatedAt: "string",
          character_list: [
            {
              id: "string",
              ch_image: "",
              ch_name: "박성호",
            },
            {
              id: "string2",
              ch_image:
                "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
              ch_name: "명재현",
            },
            {
              id: "string1",
              ch_image: "",
              ch_name: "김운학",
            },
            {
              id: "string1333",
              ch_image: "",
              ch_name: "김동현",
            },
          ],
        },
        {
          id: "3",
          event_description: "gg",
          event_name: "string;",
          order: 1,
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
        {
          id: "2",
          event_description: "kk",
          event_name: "string;",
          order: 2,
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
      ],
      createdAt: "string;",
      updatedAt: "string;",
      is_folded: true,
    },
    {
      id: "13",
      chapter_name: "사랑ss",
      is_starred: false,
      autor: "skfsfjkd",
      work_id: "gkgkgk",
      chapter_description: "사랑해라",
      order: 0,
      pevent_list: [
        {
          id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",
          order: 0,
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
      ],
      createdAt: "string;",
      updatedAt: "string;",
      is_folded: true,
    },
  ],
};
