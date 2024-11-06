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
import { createPlot, updatePlot } from "@/utils/APIs/mock/plot";

const mockPlotFolderList: TFolder = {
  isFolder: true,
  folder_name: "플롯",
  files: [
    {
      isFolder: false,
      _id: "1",
      file_name: "엘리자베스-다이시",
      isPinned: true,
    },
    {
      isFolder: false,
      _id: "2",
      file_name: "서브 1: 제인-빙리",
      isPinned: false,
    },
    {
      isFolder: false,
      _id: "3",
      file_name: "서브 2: 리디아와 윅햄 사건",
      isPinned: false,
    },
    {
      isFolder: true,
      folder_name: "원고 속 플롯",
      files: [
        {
          isFolder: false,
          _id: "001",
          file_name: "1화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "002",
          file_name: "2화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "003",
          file_name: "3화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "004",
          file_name: "4화",
          isPinned: false,
        },
      ],
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
  return (await createPlot()).id;
};

const mockScriptFolderList: TFolder = {
  isFolder: true,
  folder_name: "원고",
  files: [
    {
      isFolder: true,
      folder_name: "집필 완료",
      files: [
        {
          isFolder: false,
          _id: "001",
          file_name: "1화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "002",
          file_name: "2화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "003",
          file_name: "3화",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "004",
          file_name: "4화",
          isPinned: false,
        },
      ],
    },
    {
      isFolder: true,
      folder_name: "보관",
      files: [
        {
          isFolder: false,
          _id: "15",
          file_name: "5화 초안",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "16",
          file_name: "6화 초안",
          isPinned: false,
        },
      ],
    },
    {
      isFolder: false,
      _id: "6",
      file_name: "5화 (집필중)",
      isPinned: true,
    },
    {
      isFolder: false,
      _id: "7",
      file_name: "글 조각들 모음",
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
  const newScript = {
    id: Math.random().toString(36).substring(7),
    script_name: "새원고",
    contents: "",
  };
  mockScriptList.push(newScript);
  return newScript.id;
};

const mockInfo: TWorkInfo = {
  cover:
    "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  title: "오만과 편견 (Pride and Prejudice)",
  genre: "",
  logline:
    "성격과 계급이 다른 두 사람이 오해와 편견을 넘어서 진정한 사랑을 찾는 이야기",
  expectedQuantity: "",
  grade: null,
  introduction:
    "주인공 엘리자베스 베넷이 첫인상에 대해 오만했던 피츠윌리엄 다아시를 이해하고 사랑하게 되기까지의 여정. \n풍자와 사회적 통찰이 녹아 있는 이 소설은 당시 여성의 결혼 문제와 계급 간 갈등을 비판하면서도, \n개인의 성장과 자기 이해를 통해 사랑을 찾는 과정을 섬세하게 묘사합니다.",
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
  generateUpdateInfoMock("expectedQuantity");
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

const mockKeywordList: TKeyword[] = [];

export const createCharacterKeywordMock =
  (workspace_id: string) =>
  async ({
    keyword_name,
    lightColor,
    darkColor,
  }: {
    keyword_name: string;
    lightColor?: string;
    darkColor?: string;
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

    if (lightColor === undefined)
      lightColor =
        randomColorList[0][
          Math.floor(Math.random() * randomColorList[0].length)
        ];
    if (darkColor === undefined)
      darkColor =
        randomColorList[1][
          Math.floor(Math.random() * randomColorList[1].length)
        ];
    mockKeywordList.push({
      _id: Math.random().toString(36).substring(7),
      keyword_name,
      lightColor,
      darkColor,
    });
  };

export const getCharacterKeywordListMock =
  (workspace_id: string) => async () => {
    return JSON.parse(JSON.stringify(mockKeywordList)) as TKeyword[];
  };

createCharacterKeywordMock("")({ keyword_name: "AI생성" });

createCharacterKeywordMock("")({ keyword_name: "오만함" });
createCharacterKeywordMock("")({ keyword_name: "편견" });

createCharacterKeywordMock("")({ keyword_name: "애정" });
createCharacterKeywordMock("")({ keyword_name: "허영" });
createCharacterKeywordMock("")({ keyword_name: "소심" });

createCharacterKeywordMock("")({ keyword_name: "이기심" });
createCharacterKeywordMock("")({ keyword_name: "겉치레" });

createCharacterKeywordMock("")({ keyword_name: "착함" });
createCharacterKeywordMock("")({ keyword_name: "대화" });
createCharacterKeywordMock("")({ keyword_name: "남의 이점 추출" });

createCharacterKeywordMock("")({ keyword_name: "명료함" });
createCharacterKeywordMock("")({ keyword_name: "비판" });
createCharacterKeywordMock("")({ keyword_name: "인지" });

createCharacterKeywordMock("")({ keyword_name: "사교성" });
createCharacterKeywordMock("")({ keyword_name: "관용" });
createCharacterKeywordMock("")({ keyword_name: "안이함" });

createCharacterKeywordMock("")({ keyword_name: "오해" });
createCharacterKeywordMock("")({ keyword_name: "편견" });
createCharacterKeywordMock("")({ keyword_name: "결단력" });

createCharacterKeywordMock("")({ keyword_name: "교양" });

const 오만함 = mockKeywordList.find((k) => k.keyword_name === "오만함")!;
const 편견 = mockKeywordList.find((k) => k.keyword_name === "편견")!;

const 허영 = mockKeywordList.find((k) => k.keyword_name === "허영")!;
const 소심 = mockKeywordList.find((k) => k.keyword_name === "소심")!;

const 이기심 = mockKeywordList.find((k) => k.keyword_name === "이기심")!;
const 겉치레 = mockKeywordList.find((k) => k.keyword_name === "겉치레")!;

const 착함 = mockKeywordList.find((k) => k.keyword_name === "착함")!;
const 대화 = mockKeywordList.find((k) => k.keyword_name === "대화")!;
const 남의이점추출 = mockKeywordList.find(
  (k) => k.keyword_name === "남의 이점 추출"
)!;
const 명료함 = mockKeywordList.find((k) => k.keyword_name === "명료함")!;
const 비판 = mockKeywordList.find((k) => k.keyword_name === "비판")!;
const 인지 = mockKeywordList.find((k) => k.keyword_name === "인지")!;
const 사교성 = mockKeywordList.find((k) => k.keyword_name === "사교성")!;
const 관용 = mockKeywordList.find((k) => k.keyword_name === "관용")!;
const 안이함 = mockKeywordList.find((k) => k.keyword_name === "안이함")!;
const 오해 = mockKeywordList.find((k) => k.keyword_name === "오해")!;
const 결단력 = mockKeywordList.find((k) => k.keyword_name === "결단력")!;
const 교양 = mockKeywordList.find((k) => k.keyword_name === "교양")!;

const mockCharacterList: TCharacter[] = [
  {
    _id: "1",
    ch_name: "베네트 씨",
    ch_image: "",
    isMain: true,
    role: "아버지",
    birthday: "1760-01-01",
    gender: "남성",
    description:
      "베네트 가문의 가장으로, 오만하고 편견 있으며, 딸들을 적당히 사랑하는 인물.",
    keyword: [오만함._id, 편견._id],
    characteristic: [],
    relatedEvent: [],
  },
  {
    _id: "2",
    ch_name: "베네트 부인",
    ch_image: "",
    isMain: true,
    role: "어머니",
    birthday: "1765-01-01",
    gender: "여성",
    description: "베네트 가문의 어머니로, 허영스럽고 소심한 성격.",
    keyword: [허영._id, 소심._id],
    characteristic: [],
    relatedEvent: [],
  },
  {
    _id: "4",
    ch_name: "롱 부인",
    ch_image: "",
    isMain: false,
    role: "이웃",
    birthday: "1770-01-01",
    gender: "여성",
    description: "베네트 가문의 이웃으로, 이기적이고 겉치레를 좋아하는 성격.",
    keyword: [이기심._id, 겉치레._id],
    characteristic: [],
    relatedEvent: [],
  },
  {
    _id: "5",
    ch_name: "제인 베넷",
    ch_image: "",
    isMain: true,
    role: "주인공",
    birthday: "",
    gender: "여성",
    description:
      "차분하고 온화한 성격으로 남을 쉽게 좋아한다. 잘난 체하거나 거만한 사람들을 싫어한다.",
    characteristic: [],
    keyword: [착함._id, 대화._id, 남의이점추출._id],
    relatedEvent: [],
  },
  {
    _id: "6",
    ch_name: "엘리자베스 베넷",
    ch_image: "",
    isMain: true,
    role: "조력자",
    birthday: "",
    gender: "여성",
    description:
      "똑똑하고 관찰력이 뛰어나며, 남의 허위를 쉽게 간파한다. 거만함과 어리석음을 싫어한다.",
    characteristic: [],
    keyword: [명료함._id, 비판._id, 인지._id],
    relatedEvent: [],
  },
  {
    _id: "7",
    ch_name: "찰스 빙리",
    ch_image: "",
    isMain: true,
    role: "조력자",
    birthday: "",
    gender: "남성",
    description:
      "착하고 상냥하며 쾌활한 성격으로, 모든 사람에게 친절하다. 하지만 좀 안이한 면이 있다.",
    characteristic: [],
    keyword: [사교성._id, 관용._id, 안이함._id],
    relatedEvent: [],
  },
  {
    _id: "8",
    ch_name: "피츠윌리엄 다아시",
    ch_image: "",
    isMain: true,
    role: "조력자",
    birthday: "",
    gender: "남성",
    description:
      "지적이고 이해력이 우수하지만, 교양은 있지만 사람을 끄는 데가 없다. 고집이 세고 까다롭다.",
    characteristic: [],
    keyword: [오해._id, 편견._id, 결단력._id],
    relatedEvent: [],
  },
  {
    _id: "9",
    ch_name: "캐롤라인 빙리",
    ch_image: "",
    isMain: false,
    role: "제3자",
    birthday: "",
    gender: "여성",
    description:
      "거만하고 잘난 체하는 성격으로, 자신을 더 높게 생각한다. 명성과 지위를 중시한다.",
    characteristic: [],
    keyword: [교양._id],
    relatedEvent: [],
  },
];

export const getCharacterListMock = (workspace_id: string) => async () => {
  return JSON.parse(JSON.stringify(mockCharacterList)) as TCharacter[];
};

export const createCharacterMock = (workspace_id: string) => async () => {
  mockCharacterList.push({
    _id: Math.random().toString(36).substring(7),
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
  (workspace_id: string) => async (keyword_id: string) => {
    const index = mockKeywordList.findIndex((k) => k._id === keyword_id);
    if (index === -1) return;
    mockKeywordList.splice(index, 1);
  };

export const deleteCharacterMock =
  (workspace_id: string, character_id: string) => async () => {
    const index = mockCharacterList.findIndex((c) => c._id === character_id);
    if (index === -1) return;
    mockCharacterList.splice(index, 1);
  };

export const getCharacterMock =
  (workspace_id: string, character_id: string) => async () => {
    return JSON.parse(
      JSON.stringify(mockCharacterList.find((c) => c._id === character_id))
    ) as TCharacter;
  };

const generateUpdateCharacterMock =
  <T extends keyof TCharacter>(key: T) =>
  (workspace_id: string, character_id: string) =>
  async (value: TCharacter[T]) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
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
  (workspace_id: string) => async (character_id: string) => {
    generateUpdateCharacterMock("isMain")(workspace_id, character_id)(true);
  };

export const removeMainCharacterMock =
  (workspace_id: string) => async (character_id: string) => {
    generateUpdateCharacterMock("isMain")(workspace_id, character_id)(false);
  };

export const updateCharacterCoverImageMock =
  (workspace_id: string, character_id: string) => async (file: File) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
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
  (workspace_id: string, character_id: string) =>
  async (keyword_id: string) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.keyword.push(keyword_id);
  };

export const removeCharacterKeywordMock =
  (workspace_id: string, character_id: string) =>
  async (keyword_id: string) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.keyword = character.keyword.filter((k) => k !== keyword_id);
  };

export const addCharacterCharacteristicMock =
  (workspace_id: string, character_id: string) => async () => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.characteristic.push({ title: "", content: "" });
  };

export const updateCharacterCharacteristicTitleMock =
  (workspace_id: string, character_id: string) =>
  async ({ index, title }: { index: number; title: string }) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.characteristic[index].title = title;
  };

export const updateCharacterCharacteristicContentMock =
  (workspace_id: string, character_id: string) =>
  async ({ index, content }: { index: number; content: string }) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.characteristic[index].content = content;
  };

export const removeCharacterCharacteristicMock =
  (workspace_id: string, character_id: string) => async (index: number) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if (!character) return;
    character.characteristic.splice(index, 1);
  };

const CharacterRelationMock: TRelation[] = [
  {
    _id: "1",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "2",
  },
  {
    _id: "2",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "3",
  },
  {
    _id: "3",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "1",
    end_ch: "4",
  },
  {
    _id: "4",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "2",
    end_ch: "3",
  },
  {
    _id: "5",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "2",
    end_ch: "4",
  },
  {
    _id: "6",
    arrow_right: true,
    arrow_left: true,
    arrow_text_right: "좋아함",
    arrow_text_left: "싫어함",
    start_ch: "3",
    end_ch: "4",
  },
];

export const getCharacterRelationMock = (workspace_id: string) => async () => {
  return JSON.parse(JSON.stringify(CharacterRelationMock)) as TRelation[];
};

export const createCharacterRelationMock =
  (workspace_id: string) =>
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
      _id: Math.random().toString(36).substring(7),
      arrow_right: true,
      arrow_left: true,
      arrow_text_right,
      arrow_text_left,
      start_ch,
      end_ch,
    });
  };

export const deleteCharacterRelationMock =
  (workspace_id: string) => async (relation_id: string) => {
    const index = CharacterRelationMock.findIndex((r) => r._id === relation_id);
    if (index === -1) return;
    CharacterRelationMock.splice(index, 1);
  };

export const updateCharacterRelationMock =
  (workspace_id: string) =>
  async ({
    relation_id,
    arrow_text_right,
    arrow_text_left,
  }: {
    relation_id: string;
    arrow_text_right: string;
    arrow_text_left: string;
  }) => {
    const relation = CharacterRelationMock.find((r) => r._id === relation_id);
    if (!relation) return;
    relation.arrow_text_right = arrow_text_right;
    relation.arrow_text_left = arrow_text_left;
  };

const mockScriptList: any[] = [
  {
    id: "001",
    script_name: "1화",
    contents: `1  많은 재산을 모은 독신 남성에게 아내가 필요하리라는 것은 누구나가 다 알고 있는 진리이다.\n이런 남자가 처음으로 이웃에 옮겨오게 되면, 그 사람의 기분이 어떻고 생각이 어떠한가를 동리사람들로서는 알 길이 없다 하더라도, 이 진리는 주위 사람들 마음 속에 꽉 자리잡고 움직일 수 없는것이 되어, 자기네 딸 중의 누군가가 그를 차지하게 될 것으로 생각하게 마련이다.\n어느 날 베네트 부인은 남편에게 이렇게 말을 건넸다.\n\n"여보, 네더필드 저택에 결국 사람을 들이기로 한 것 같은데 그 얘기 들으셨어요?" \n 베네트 씨는 그런 말을 듣지 못했다고 대답했다.\n\n"하지만 틀림없다는가 봐요, 롱 부인께서 방금 다녀가셨는데 그 말을 하시더군요." \n 부인도 맞받아 말했다.\n베네트 씨는 대꾸는 하지 않았다.\n\n"어떤 사람이 들게 되었는지 당신은 궁금하지도 않으세요?" \n 아내는 더 조바심이 나서 소리를 질렀다.\n\n"당신이 들려 주겠다는데, 왜 난들 듣지 않겠소?" \n 이 정도면 충분히 구미가 당긴 말이었다.\n\n"글쎄 들어 보세요, 당신도 알아두셔야 하니까요. 롱 부인 말로는, 네더필드에 들게 된 사람은 북 잉글랜드출신의 청년으로 꽤 부자라나 봐요. 월요일에 사두마차를타고 와서 집을 둘러보고서는 아주 마음에 들었는지 그자리에서 모리스 씨와 결정을 보았다는 거예요.미가엘제(9월29일) 전에 들 예정이고, 하인 몇 사람은내주 말까진 오게 돼 있나 보죠" \n\n"이름이 뭐랍디까?" \n\n"빙리래요." \n\n"결혼을 한 사람인가, 그렇지 아니면 독신인가?" \n\n"독신이에요. 여보! 재산이 많은 독신인데다가, 일 년에4, 5천 파운드. 우리 애들에겐 꼭 어울리는 사람이란 말예요!" \n\n"어떻게 해서 그렇다는 거지? 그게 우리 애들에게 어쨌다는 거요?" \n\n"정말 딱하신 분이세요, 당신은! 어쩌면 그렇게 한심할 수가 있어요!그 사람하고 우리 집 애하고 연분을 맺게 했으면 하는 제 생각을 당신은 알아주셔야 하는 거예요." \n\n"그런 속셈으로 이사를 온답디까?" \n\n"속셈이라뇨! 그런 말씀 마세요. 어째서 그런 말씀을 하실까. 그렇지만 우리 애들 중의 누구 하나를사랑하게 될 공산도 없지 않거든요. 그러니까 그 사람이 오는 대로 당신이 방문해 주셨으면 해요." \n\n"그렇게 할 필요가 어디 있소. 가려면 애들 데리고 당신이나 가보도록 해요. 아니면 애들만 보내면될 게 아니오. 그렇게 하는 게 더 좋을 것 같소. 당신은 애들만큼이나 예쁜 사람이니까. 혹시 빙리란청년이 당신을 제일 좋아하게 될지 누가 알겠소." \n\n"아이구 망측해라. 이래도 저도 한때는 누구 못지 않은 미인이었지만, 이제는 잘난 체할 입장이못되거든요. 다 자란 딸자식을 다섯씩이나 거느린 여자가 예쁘니 뭐니 하는 생각은 다 그만둬야지요." \n\n"그런 경우에 예쁘고 어쩌고 할 게 뭐 있소?" \n\n"하지만 여보, 그 청년이 이웃에 오면 당신이 꼭 방문해서 인사를 나눠야 해요." \n\n"약속은 못하겠는데" \n\n"그렇지만 우리 애들 생각을 하셔야죠. 그 애들 중 누구하고 인연이 맺어진다고 생각해 보란 말이에요.정말 윌리엄 루커스 경과 부인께선 그런 이유로 방문하기로결정한 모양이에요. 아시다시피 그분들은 새로 왔다고 해서 찾아가는 그런분들이 아니거든요. 정말 당신이 가셔야 하는 거예요. 당신이안가신다면 제가 그 애들하고 간다는 건 정말 엄두도 못 낼 일이니까요." \n\n"당신은 지나치게 겸손하군 그래. 내 생각 같아선, 빙리 씨는 여자들끼리 오는 것을 더 좋아할 것 같은데. 내 편지 한 장을써서, 우리 애들 중에서 누구든 선택해서 결혼하게 되면 아무 이의 없이승낙하리라는 내 뜻을 정확히 전하도록 할 테니까. 리지(엘리자베드)에대한 칭찬을 꼭 한마디 써넣어야겠어." \n\n"제발 그런 짓은 그만두세요. 리지가 다른 애들보다 어디가괜찮아요, 글쎄. 사실 제인의 반만큼도 예쁘지가 못하고 리디어의반만큼도 상냥하지가 못해요. 그런데도 당신은 리지만 내세우시니까 말이에요." \n\n"원 애들이라고 하나같이 이렇다 할 점이 있어야지." \n\n"우리 애들이 어느 계집애들처럼 한결같이 못나고 무식하단 말야.그런데 리지만은 형제들 중에서 제일 예민하거든" \n\n"여보, 어쩌면 당신은 제 자식들 흉을 그렇게하시기예요! 재미가 있어서 절 놀리시는 모양인데요. 저의 약한 신경을 손톱만큼도 생각 안해 주시는군요." \n\n"그건 오해야, 당신 신경을 굉장히 아끼고 있단 말요. 나에겐 옛 친구나 다를 바가 없으니까. 적어도20년 동안 당신이 신경 얘길 할 때마다 각별히 고려를 해가며 말하는 것을 들었소." \n\n"아, 제 고통이 어떤가는 당신이 잘 모르실 거예요." \n\n"그러나 당신이 그 고통을 극복해서 매년 4천 파운드의 청년들이이웃에 많이 와서 살아 줬으면 좋겠소." \n\n"설사 그렇다 하더라도 당신께선 그들을 찾아가실 분이 아니시니까, 스무 명이 와 산대도 아무 소용 없겠어요." \n\n"그때 돼 봐야 알게 되는 거요. 스무 명이 와 보시오, 난 하나도 빼놓지 않고 다 찾아가고 말 테니까." \n 베네트 씨는 워낙 기민한 재주와 풍자적인 기질과 신중함과 변덕장이의 혼합체였었기 때문에 23년을함께 살아온 부인으로서도 그의 성격을 이해하기란 힘든 처지였다.\n반면에 부인의 마음을 알기란 그리 어려운 일은 아니었다. 그녀의 성격은 이해력이 부족하고 지식이많지 못한데다가 변덕이 심한 여인이었다. 무슨 불만이 생기게 되면 그것 때문에 고통스럽게 된다고생각했다. 그녀의 평생에서 중요한 사업은 딸들을 출가시키는 일이며, 낙이 있다고 한다면 남의 집을방문해서 세상 돌아가는 이야기나 나누며 지내는 것이었다.`,
  },
  {
    id: "2",
    script_name: "원숭이도 고장날 때가 있다",
    contents: "werwe",
  },
  {
    id: "3",
    script_name: "원하는 만큼, 고지식하게",
    contents: "zxcv",
  },
  {
    id: "4",
    script_name: "원더풀 고양이",
    contents: "234234",
  },
];

export const getScript = async (scriptId: string) => {
  return mockScriptList.find((script) => script.id === scriptId);
};

export const updateScriptContents =
  (scriptId: string) => async (contents: string) => {
    const script = mockScriptList.find((script) => script.id === scriptId);
    if (script) script.contents = contents;
  };

export const generagePlotAndCharacterByScriptMock =
  (workspace_id: string, script_id: string) => async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newPlotId = await createPlotMock(workspace_id)();
    mockPlotFolderList.files.push({
      isFolder: false,
      _id: newPlotId,
      file_name: "플롯",
      isPinned: false,
    });
    await updatePlot(newPlotId);
    createCharacterKeywordMock(workspace_id)({ keyword_name: "AI생성" });
    const ai생성 = mockKeywordList.find((k) => k.keyword_name === "AI생성")!;

    createCharacterKeywordMock(workspace_id)({ keyword_name: "지식" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "지혜" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "자립" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "자신감" });

    createCharacterKeywordMock(workspace_id)({ keyword_name: "아름다움" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "친절" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "이해력" });

    createCharacterKeywordMock(workspace_id)({ keyword_name: "비판" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "자기애" });

    createCharacterKeywordMock(workspace_id)({ keyword_name: "부" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "거만함" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "관대함" });

    createCharacterKeywordMock(workspace_id)({ keyword_name: "자존심" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "미모" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "자만심" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "우스움" });

    createCharacterKeywordMock(workspace_id)({ keyword_name: "위선" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "광기" });
    createCharacterKeywordMock(workspace_id)({ keyword_name: "우둔함" });

    const 지식 = mockKeywordList.find((k) => k.keyword_name === "지식")!;
    const 지혜 = mockKeywordList.find((k) => k.keyword_name === "지혜")!;
    const 자립 = mockKeywordList.find((k) => k.keyword_name === "자립")!;
    const 자신감 = mockKeywordList.find((k) => k.keyword_name === "자신감")!;
    const 아름다움 = mockKeywordList.find(
      (k) => k.keyword_name === "아름다움"
    )!;
    const 친절 = mockKeywordList.find((k) => k.keyword_name === "친절")!;
    const 이해력 = mockKeywordList.find((k) => k.keyword_name === "이해력")!;
    const 비판 = mockKeywordList.find((k) => k.keyword_name === "비판")!;
    const 자기애 = mockKeywordList.find((k) => k.keyword_name === "자기애")!;
    const 부 = mockKeywordList.find((k) => k.keyword_name === "부")!;
    const 거만함 = mockKeywordList.find((k) => k.keyword_name === "거만함")!;
    const 관대함 = mockKeywordList.find((k) => k.keyword_name === "관대함")!;
    const 자존심 = mockKeywordList.find((k) => k.keyword_name === "자존심")!;
    const 미모 = mockKeywordList.find((k) => k.keyword_name === "미모")!;
    const 자만심 = mockKeywordList.find((k) => k.keyword_name === "자만심")!;
    const 우스움 = mockKeywordList.find((k) => k.keyword_name === "우스움")!;
    const 위선 = mockKeywordList.find((k) => k.keyword_name === "위선")!;
    const 광기 = mockKeywordList.find((k) => k.keyword_name === "광기")!;
    const 우둔함 = mockKeywordList.find((k) => k.keyword_name === "우둔함")!;

    const mockCharacterList2: TCharacter[] = [
      {
        _id: "1",
        ch_name: "엘리자베스 베네트",
        ch_image: null,
        isMain: true,
        role: "주인공",
        birthday: "",
        gender: "여성",
        description:
          "지적이고 명석한 젊은 여성으로, 자존심이 강하고 독립적이다.",
        characteristic: [],
        keyword: [ai생성._id, 지식._id, 지혜._id, 자립._id, 자신감._id],
        relatedEvent: [],
      },
      {
        _id: "2",
        ch_name: "제인 베네트",
        ch_image: null,
        isMain: false,
        role: "엘리자베스의 누나",
        birthday: "",
        gender: "여성",
        description:
          "아름답고 온화한 젊은 여성으로, 타인의 감정을 잘 이해한다.",
        characteristic: [],
        keyword: [ai생성._id, 아름다움._id, 친절._id, 이해력._id],
        relatedEvent: [],
      },
      {
        _id: "3",
        ch_name: "메리 베네트",
        ch_image: null,
        isMain: false,
        role: "엘리자베스의 누나",
        birthday: "",
        gender: "여성",
        description: "똑똑하고 독설적이지만, 자기중심적이고 덜 아름답다.",
        characteristic: [],
        keyword: [ai생성._id, 지식._id, 비판._id, 자기애._id],
        relatedEvent: [],
      },
      {
        _id: "4",
        ch_name: "캐서린 드 버그",
        ch_image: null,
        isMain: false,
        role: "엘리자베스와 다아시의 이웃",
        birthday: "",
        gender: "여성",
        description: "부자이고 자만하지만, 친절한 면도 있다.",
        characteristic: [],
        keyword: [ai생성._id, 부._id, 거만함._id, 관대함._id],
        relatedEvent: [],
      },
      {
        _id: "5",
        ch_name: "윌리엄 다아시",
        ch_image: null,
        isMain: true,
        role: "주인공의 짝사랑 대상",
        birthday: "",
        gender: "남성",
        description: "부자이고 잘생기지만, 자존심이 강하고 거만하다.",
        characteristic: [],
        keyword: [ai생성._id, 부._id, 미모._id, 자존심._id, 거만함._id],
        relatedEvent: [],
      },
      {
        _id: "6",
        ch_name: "피츠윌리엄 콜린스",
        ch_image: null,
        isMain: false,
        role: "엘리자베스에게 구혼하는 성직자",
        birthday: "",
        gender: "남성",
        description:
          "자만심이 강하고 우스운 성격으로, 엘리자베스에게 거절당한다.",
        characteristic: [],
        keyword: [ai생성._id, 자만심._id, 우스움._id],
        relatedEvent: [],
      },
    ];

    mockCharacterList.push(...mockCharacterList2);
    return newPlotId;
  };
