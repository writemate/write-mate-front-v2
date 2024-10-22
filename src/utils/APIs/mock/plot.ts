export interface responseGetPlotType {
  id: string;
  plot_name: string;
  chapters: PlotChapterType[];
  is_starred: boolean;
  is_folded: boolean;
}

export type PlotChapterType = {
  id: string;
  chapter_name: string;
  chapter_description: string;
  order: number;
  pevent: PlotEventType[];
};

export type PlotEventType = {
  id: string;
  event_description: string;
  event_name: string;
  plot_id: string;
  order: number;
  author: string;
  work_id: string;
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
    ch_image: "string;",
    ch_name: "string;",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "strinddg",
    ch_image: "string",
    ch_name: "string;",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string2s",
    ch_image: "string",
    ch_name: "이상혁",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "stringd1",
    ch_image: "string",
    ch_name: "한태산",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string",
    ch_image: "string",
    ch_name: "박성호",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string2",
    ch_image: "string",
    ch_name: "명재현",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string1",
    ch_image: "string",
    ch_name: "김운학",
    description: "string;",
    keyword: ["st"],
  },
  {
    id: "string1333",
    ch_image: "string",
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
      chapter_name: "사랑",
      chapter_description: "사랑해라",
      order: 0,
      pevent: [
        {
          id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",
          plot_id: "string;",
          order: 0,
          author: "string;",
          work_id: "string;",
          createdAt: "string",
          updatedAt: "string",
          character_list: [
            {
              id: "string",
              ch_image: "string",
              ch_name: "박성호",
            },
            {
              id: "string2",
              ch_image: "string",
              ch_name: "명재현",
            },
            {
              id: "string1",
              ch_image: "string",
              ch_name: "김운학",
            },
            {
              id: "string1333",
              ch_image: "string",
              ch_name: "김동현",
            },
          ],
        },
        {
          id: "3",
          event_description: "gg",
          event_name: "string;",
          plot_id: "string;",
          order: 1,
          author: "string;",
          work_id: "string;",
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
        {
          id: "2",
          event_description: "kk",
          event_name: "string;",
          plot_id: "string;",
          order: 2,
          author: "string;",
          work_id: "string;",
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
      ],
    },
    {
      id: "13",
      chapter_name: "사랑ss",
      chapter_description: "사랑해라",
      order: 0,
      pevent: [
        {
          id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",
          plot_id: "string;",
          order: 0,
          author: "string;",
          work_id: "string;",
          createdAt: "string",
          updatedAt: "string",
          character_list: [],
        },
      ],
    },
  ],
  is_starred: true,
  is_folded: true,
};
