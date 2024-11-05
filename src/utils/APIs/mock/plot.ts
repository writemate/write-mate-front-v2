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

export interface TPatchUpdateENameRequest {
  peventId: string;
  event_name: string;
}

export interface TPatchUpdateEDRequest {
  peventId: string;
  event_description: string;
}

export interface TPatchUpdateEORequest {
  peventId: string;
  pre_idx: number;
  next_idx: number;
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

export const mockPlotList: responseGetPlotType[] = [{
  id: "1",
  plot_name: "네더필드의 새로운 주인",
  chapters: [
    {
      id: "2",
      autor: "",
      is_starred: false,
      chapter_name: "네더필드의 새로운 주인",
      chapter_description:
        "부유한 영국인 독신 남성 빙리가 네더필드 저택에 이사하면서 베네트 가족 중 누가 그와 결혼할지에 대한 추측이 난무한다.",
      work_id: "story123",
      order: 0,
      pevent_list: [],
      createdAt: "2024-09-30T10:00:00Z",
      updatedAt: "2024-10-05T10:00:00Z",
      is_folded: false,
    },
    {
      id: "2",
      autor: "제인 오스틴",
      is_starred: false,
      chapter_name: "방문의 시작",
      chapter_description:
        "베네트 씨가 이웃인 빙리 씨에게 처음 방문을 하기로 결정하고, 베네트 부인은 반대하지만, 가족들이 빙리 씨의 방문을 기대하는 내용.",
      work_id: "pride-and-prejudice",
      order: 0,
      pevent_list: [],
      createdAt: "2024-09-30T10:00:00Z",
      updatedAt: "2024-10-05T10:00:00Z",
      is_folded: false,
    },
    {
      id: "3",
      autor: "제인 오스틴",
      is_starred: false,
      chapter_name: "네더필드 파티",
      chapter_description:
        "베네트 자매들이 네더필드 파티에 참석하여 빙리 씨와 다아시 씨를 만난다.",
      work_id: "story123",
      order: 0,
      pevent_list: [
        {
          id: "1",
          event_description:
            "네더필드 파티에서 빙리 씨와 다아시 씨가 등장한다.",
          event_name: "빙리 씨와 다아시 씨의 등장",
          order: 0,
          createdAt: "2024-10-01T12:00:00Z",
          updatedAt: "2024-10-02T12:00:00Z",
          character_list: [],
        },
        {
          id: "2",
          event_description: "제인 베네트가 빙리 씨와 춤을 춘다.",
          event_name: "제인 베네트와 빙리 씨의 춤",
          order: 1,
          createdAt: "2024-10-03T14:00:00Z",
          updatedAt: "2024-10-04T14:00:00Z",
          character_list: [],
        },
        {
          id: "3",
          event_description: "엘리자베스 베네트가 다아시 씨와 대화를 한다.",
          event_name: "엘리자베스 베네트와 다아시 씨의 대화",
          order: 2,
          createdAt: "2024-10-06T16:00:00Z",
          updatedAt: "2024-10-07T16:00:00Z",
          character_list: [],
        },
      ],
      createdAt: "2024-09-30T10:00:00Z",
      updatedAt: "2024-10-05T10:00:00Z",
      is_folded: false,
    },
    {
      id: "4",
      autor: "",
      is_starred: false,
      chapter_name: "파티와 편견",
      chapter_description:
        "엘리자베스와 제인 베넷의 가족이 살고 있는 메리튼의 무도회를 중심으로 전개되는 이야기.\n제인은 빙리 씨에 매료되지만, 엘리자베스는 빙리 씨의 친구 다아시에 대해 편견을 갖는다.",
      work_id: "",
      order: 0,
      pevent_list: [
        {
          id: "1",
          event_description:
            "메리튼 무도회에서 제인은 빙리 씨와 춤을 추고 그에게 매료된다.",
          event_name: "메리튼 무도회",
          order: 1,
          createdAt: "2024-09-30T10:00:00Z",
          updatedAt: "2024-10-05T10:00:00Z",
          character_list: [],
        },
        {
          id: "2",
          event_description:
            "엘리자베스는 다아시가 거만하고 오만하다고 생각하지만, 빙리 씨는 엘리자베스에게 관심을 보인다.",
          event_name: "엘리자베스와 다아시의 첫 만남",
          order: 2,
          createdAt: "2024-09-30T10:00:00Z",
          updatedAt: "2024-10-05T10:00:00Z",
          character_list: [],
        },
        {
          id: "3",
          event_description:
            "캐롤라인 빙리는 엘리자베스에게 자신의 형제에 대한 관심이 없다고 말하며 경고한다.",
          event_name: "캐롤라인 빙리의 경고",
          order: 3,
          createdAt: "2024-09-30T10:00:00Z",
          updatedAt: "2024-10-05T10:00:00Z",
          character_list: [],
        },
      ],
      createdAt: "2024-09-30T10:00:00Z",
      updatedAt: "2024-10-05T10:00:00Z",
      is_folded: false,
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
