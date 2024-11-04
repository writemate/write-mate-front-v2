export interface responseGetPlotType {
  id: string;
  plot_name: string;
  chapters: PlotChapterType[];
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

export const mockPlotList: responseGetPlotType[] = [{
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
      is_folded: false,
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
}];

export const getPlot = async (plotId: string): Promise<responseGetPlotType> => {
  const data = mockPlotList.find((plot) => plot.id === plotId);
  if(data) return data;
  return mockPlotList[0];
}

export const createPlot = async (): Promise<responseGetPlotType> => {
  const newPlot: responseGetPlotType = {
    id: Math.random().toString(36).substring(7),
    plot_name: "",
    chapters: [],
  };
  mockPlotList.push(newPlot);
  return newPlot;
}

export const updatePlot = async (plotId: string): Promise<void> => {
  const data = mockPlotList.find((plot) => plot.id === plotId);
  if(!data) return;
  data.chapters=[
    {
      id: "2",
      autor: "제인 오스틴",
      is_starred: false,
      chapter_name: "네더필드의 새로운 주인",
      chapter_description:
        "부유한 영국인 독신 남성 빙리가 네더필드 저택에 이사하면서 베네트 가족 중 누가 그와 결혼할지에 대한 추측이 난무한다.",
      work_id: "story123",
      order: 0,
      pevent_list: [],
      createdAt: "string;",
      updatedAt: "string;",
      is_folded: true,
    },
  ];
}
