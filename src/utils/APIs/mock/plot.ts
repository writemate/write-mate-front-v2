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
  data.plot_name = "자존심과 편견";
  data.chapters= [
      {
        id: "1",
        autor: "제인 오스틴",
        is_starred: true,
        chapter_name: "자존심과 편견: 첫 장",
        chapter_description:
          "자존심과 편견의 첫 장에서 베네트 가족과 루커스 가족 간의 우호적 관계와 빙리와 다아시의 도착에 대한 흥분이 소개됩니다.",
        work_id: "story123",
        order: 0,
        pevent_list: [
          {
            id: "1",
            event_description:
              "루커스 가족이 베네트 가족에게 빙리 씨와 다아시 씨의 도착 소식을 전합니다.",
            event_name: "빙리 씨와 다아시 씨의 도착 소식 전달",
            order: 1,
            createdAt: "2024-10-01T12:00:00Z",
            updatedAt: "2024-10-02T12:00:00Z",
            character_list: [],
          },
          {
            id: "2",
            event_description:
              "메리 베네트는 빙리 씨가 베네트 가족의 누군가와 결혼할 것이라고 추측합니다.",
            event_name: "메리 베네트의 추측",
            order: 2,
            createdAt: "2024-10-03T14:00:00Z",
            updatedAt: "2024-10-04T14:00:00Z",
            character_list: [],
          },
          {
            id: "3",
            event_description:
              "엘리자베스 베네트는 빙리 씨와 다아시 씨의 자존심에 대해 논평합니다.",
            event_name: "엘리자베스 베네트의 자존심 논평",
            order: 3,
            createdAt: "2024-10-05T16:00:00Z",
            updatedAt: "2024-10-06T16:00:00Z",
            character_list: [],
          },
        ],
        createdAt: "2024-09-30T10:00:00Z",
        updatedAt: "2024-10-05T10:00:00Z",
        is_folded: false,
      },
    ];
}
