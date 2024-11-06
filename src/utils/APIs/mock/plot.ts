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

export const mockPlotList: responseGetPlotType[] = [
  {
    id: "1",
    plot_name: "네더필드의 새로운 주인",
    chapters: [
      {
        id: "1",
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
  },
  {
    id: "001",
    plot_name: "1화",
    chapters: [
      {
        id: "1",
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
    ],
  },
  {
    id: "002",
    plot_name: "2화",
    chapters: [
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
    ],
  },
  {
    id: "003",
    plot_name: "3화",
    chapters: [
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
    ],
  },
  {
    id: "004",
    plot_name: "4화",
    chapters: [
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
  },
  {
    id: "2",
    plot_name: "서브 1: 제인-빙리",
    chapters: [
      {
        id: "5",
        autor: "",
        is_starred: false,
        chapter_name: "제인과 빙리의 연애",
        chapter_description:
          "제인과 찰스 빙리의 관계가 발전하는 과정을 다룬 이야기.\n제인과 빙리는 서로에게 매력을 느끼지만, 빙리의 친구들과 가족이 이 관계를 방해하려 한다.",
        work_id: "",
        order: 1,
        pevent_list: [
          {
            id: "1",
            event_description:
              "제인은 빙리 씨와 무도회에서 만난 후 그의 친절함에 호감을 느낀다.",
            event_name: "첫 만남에서의 호감",
            order: 1,
            createdAt: "2024-09-30T12:00:00Z",
            updatedAt: "2024-10-05T12:00:00Z",
            character_list: [],
          },
          {
            id: "2",
            event_description:
              "제인이 병에 걸려 빙리 가문에서 머물게 되고, 빙리 씨는 그녀를 돌본다.",
            event_name: "제인의 병간호",
            order: 2,
            createdAt: "2024-09-30T13:00:00Z",
            updatedAt: "2024-10-05T13:00:00Z",
            character_list: [],
          },
          {
            id: "3",
            event_description:
              "캐롤라인 빙리가 제인과 엘리자베스에게 빙리 씨가 결혼 상대를 정했음을 암시하며 두 사람의 관계를 방해하려 한다.",
            event_name: "캐롤라인의 방해",
            order: 3,
            createdAt: "2024-09-30T14:00:00Z",
            updatedAt: "2024-10-05T14:00:00Z",
            character_list: [],
          },
          {
            id: "4",
            event_description:
              "다아시가 제인과 빙리의 관계를 좋지 않게 보고, 빙리를 설득하여 런던으로 떠나게 한다.",
            event_name: "다아시의 개입",
            order: 4,
            createdAt: "2024-09-30T15:00:00Z",
            updatedAt: "2024-10-05T15:00:00Z",
            character_list: [],
          },
          {
            id: "5",
            event_description:
              "결국 다아시는 자신의 오해를 깨닫고, 빙리와 제인의 재회를 돕는다.",
            event_name: "다아시의 화해",
            order: 5,
            createdAt: "2024-09-30T16:00:00Z",
            updatedAt: "2024-10-05T16:00:00Z",
            character_list: [],
          },
        ],
        createdAt: "2024-09-30T12:00:00Z",
        updatedAt: "2024-10-05T12:00:00Z",
        is_folded: false,
      },
    ],
  },
  {
    id: "3",
    plot_name: "서브 2: 리디아와 윅햄 사건",
    chapters: [
      {
        id: "6",
        autor: "",
        is_starred: false,
        chapter_name: "리디아와 윅햄의 사건",
        chapter_description:
          "리디아 베넷이 윅햄과 도망쳐 베넷 가문에 큰 불명예를 안기고, 이를 해결하기 위해 다아시가 나서는 이야기.\n이를 통해 엘리자베스에 대한 다아시의 마음이 더욱 드러난다.",
        work_id: "",
        order: 2,
        pevent_list: [
          {
            id: "1",
            event_description:
              "리디아는 가족의 반대에도 불구하고 윅햄과 가까워지고, 비밀스러운 만남을 지속한다.",
            event_name: "리디아와 윅햄의 비밀스러운 만남",
            order: 1,
            createdAt: "2024-10-01T10:00:00Z",
            updatedAt: "2024-10-05T10:00:00Z",
            character_list: [],
          },
          {
            id: "2",
            event_description:
              "리디아와 윅햄이 런던으로 도망쳐 베넷 가문에 큰 스캔들이 발생한다.",
            event_name: "리디아와 윅햄의 도주",
            order: 2,
            createdAt: "2024-10-01T11:00:00Z",
            updatedAt: "2024-10-05T11:00:00Z",
            character_list: [],
          },
          {
            id: "3",
            event_description:
              "엘리자베스는 리디아의 사건에 대한 소식을 듣고 큰 충격을 받는다.",
            event_name: "엘리자베스의 충격",
            order: 3,
            createdAt: "2024-10-01T12:00:00Z",
            updatedAt: "2024-10-05T12:00:00Z",
            character_list: [],
          },
          {
            id: "4",
            event_description:
              "다아시는 엘리자베스와 그녀의 가족을 돕기 위해 윅햄에게 돈을 제공하고, 리디아와 윅햄의 결혼을 주선한다.",
            event_name: "다아시의 개입",
            order: 4,
            createdAt: "2024-10-01T13:00:00Z",
            updatedAt: "2024-10-05T13:00:00Z",
            character_list: [],
          },
          {
            id: "5",
            event_description:
              "리디아와 윅햄의 결혼이 이루어지고, 베넷 가문은 겨우 불명예를 면하게 된다.",
            event_name: "리디아와 윅햄의 결혼",
            order: 5,
            createdAt: "2024-10-01T14:00:00Z",
            updatedAt: "2024-10-05T14:00:00Z",
            character_list: [],
          },
          {
            id: "6",
            event_description:
              "엘리자베스는 다아시의 도움을 통해 그에 대한 오해를 풀고, 그의 진심을 깨닫게 된다.",
            event_name: "엘리자베스의 깨달음",
            order: 6,
            createdAt: "2024-10-01T15:00:00Z",
            updatedAt: "2024-10-05T15:00:00Z",
            character_list: [],
          },
        ],
        createdAt: "2024-10-01T10:00:00Z",
        updatedAt: "2024-10-05T10:00:00Z",
        is_folded: false,
      },
    ],
  },
];

export const getPlot = async (plotId: string): Promise<responseGetPlotType> => {
  const data = mockPlotList.find((plot) => plot.id === plotId);
  if (data) return data;
  return mockPlotList[0];
};

export const createPlot = async (): Promise<responseGetPlotType> => {
  const newPlot: responseGetPlotType = {
    id: Math.random().toString(36).substring(7),
    plot_name: "",
    chapters: [],
  };
  mockPlotList.push(newPlot);
  return newPlot;
};

export const updatePlot = async (plotId: string): Promise<void> => {
  const data = mockPlotList.find((plot) => plot.id === plotId);
  if (!data) return;
  data.plot_name = "자존심과 편견";
  data.chapters = [
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
};
