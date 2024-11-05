import { TCharacter, TFolder, TKeyword, TPlot, TWorkInfo, TRelation } from "../types";
import axiosInstance from "../axiosInstance";
import { colorSystem } from "@/styles/colorSystem";
import { createPlot, updatePlot } from "@/utils/APIs/mock/plot";

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
  return JSON.parse(JSON.stringify(mockPlotFolderList));
}

export const getChapterListMock = (workId: string) => async () => {
  const response = await axiosInstance.get<TPlot>(`/api/works/${workId}/plots`);
  return response.data;
}

export const updatePlotFolderMock = async ({folder}:{workId: string, folder:TFolder}) => {
  mockPlotFolderList.files = folder.files;
}

export const createPlotMock = (workId: string) => async () => {
  return (await createPlot()).id;
}

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
          _id: "1",
          file_name: "원치 않았던 고백",
          isPinned: false,
        },
        {
          isFolder: false,
          _id: "2",
          file_name: "원숭이도 고장날 때가 있다",
          isPinned: false,
        },{
          isFolder: true,
          folder_name: "폴리우레탄을 더듬다",
          files: [
            {
              isFolder: false,
              _id: "5",
              file_name: "원고1",
              isPinned: false,
            },
            {
              isFolder: false,
              _id: "6",
              file_name: "원고2",
              isPinned: false,
            },
          ]
        }
      ]
    },
    {
      isFolder: false,
      _id: "3",
      file_name: "원하는 만큼, 고지식하게",
      isPinned: false,
    },
    {
      isFolder: false,
      _id: "4",
      file_name: "원더풀 고양이",
      isPinned: false,
    },
  ]
};

export const getScriptFolderListMock = (workId: string) => async ()=> {
  //deep copy
  return JSON.parse(JSON.stringify(mockScriptFolderList));
}

export const updateScriptFolderMock = async ({folder}:{workId: string, folder:TFolder}) => {
  mockScriptFolderList.files = folder.files;
}

export const createScriptMock = (workId: string) => async () => {
  const newScript = {
    id: Math.random().toString(36).substring(7),
    script_name: "새원고",
    contents: "",
  };
  mockScriptList.push(newScript);
  return newScript.id;
}

const mockInfo: TWorkInfo = {
  cover: "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  title: "오만과 편견 (*Pride and Prejudice*)",
  genre: "",
  logline: "성격과 계급이 다른 두 사람이 오해와 편견을 넘어서 진정한 사랑을 찾는 이야기",
  expectedQuantity: -1,
  grade: null,
  introduction: "*오만과 편견*은 19세기 영국 상류층을 배경으로 하여, 결혼과 계급, 인간의 편견과 감정에 대해 탐구하는 제인 오스틴의 대표작입니다. 이야기는 주인공 엘리자베스 베넷이 첫인상에 대해 오만했던 피츠윌리엄 다아시를 이해하고 사랑하게 되기까지의 여정을 그립니다. 풍자와 사회적 통찰이 녹아 있는 이 소설은 당시 여성의 결혼 문제와 계급 간 갈등을 비판하면서도, 개인의 성장과 자기 이해를 통해 사랑을 찾는 과정을 섬세하게 묘사합니다.",
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
export const updateExpectedQuantityMock = generateUpdateInfoMock("expectedQuantity");
export const updateGradeMock = generateUpdateInfoMock("grade");
export const updateIntroductionMock = generateUpdateInfoMock("introduction");
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

const mockKeywordList: TKeyword[] = [
  { _id: "1", keyword_name: "주연", lightColor: colorSystem.red200, darkColor: colorSystem.red600 },
  { _id: "2", keyword_name: "중립", lightColor: colorSystem.orange200, darkColor: colorSystem.orange500 },
  { _id: "3", keyword_name: "빌런", lightColor: colorSystem.blue200, darkColor: colorSystem.blue500 },
  { _id: "4", keyword_name: "알고보면 착한 빌런", lightColor: colorSystem.green200, darkColor: colorSystem.green500 },
  { _id: "5", keyword_name: "바보", lightColor: colorSystem.purple200, darkColor: colorSystem.purple500 },
  { _id: "6", keyword_name: "호라 모 젠젠 라인", lightColor: colorSystem.darkYellow200, darkColor: colorSystem.darkYellow600 },
  { _id: "7", keyword_name: "콩라인", lightColor: colorSystem.green200, darkColor: colorSystem.green500 },
  { _id: "8", keyword_name: "츤데레", lightColor: colorSystem.red200, darkColor: colorSystem.red500 },
  { _id: "9", keyword_name: "설명충", lightColor: colorSystem.orange200, darkColor: colorSystem.orange500 },
  { _id: "10", keyword_name: "집착", lightColor: colorSystem.darkYellow200, darkColor: colorSystem.darkYellow600 },
  { _id: "11", keyword_name: "열혈", lightColor: colorSystem.green200, darkColor: colorSystem.green500 },
  { _id: "12", keyword_name: "갭모에", lightColor: colorSystem.blue200, darkColor: colorSystem.blue500 },
  { _id: "13", keyword_name: "금태양", lightColor: colorSystem.purple200, darkColor: colorSystem.purple500 },
  { _id: "14", keyword_name: "병약", lightColor: colorSystem.red200, darkColor: colorSystem.red500 },
];

const mockCharacterList: TCharacter[] = [{
  _id: "1",
  ch_name: "주인공",
  ch_image: "",
  isMain: true,
  role: "주인공",
  birthday: "",
  gender: "",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
  characteristic: [],
  keyword: ["1", "5", "9"],
  relatedEvent: [],
},{
  _id: "2",
  ch_name: "ㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ라ㅣㅜㄴㅇ",
  ch_image: "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  isMain: true,
  role: "주인공ㄴㅇㄹㅎㅇㄹㄴㅇㄹ허ㅏㅣㅠㅜㄴㅇㄹㅎ허ㅏㅣㅜㄴㅇ",
  birthday: "",
  gender: "",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
  characteristic: [],
  keyword: ["7", "2", "3", "4"],
  relatedEvent: [],
}
,{
  _id: "3",
  ch_name: "ㄷㅅㄹㅎㅇㅍㅇㄹㅍ",
  ch_image: "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  isMain: true,
  role: "ㄴㅇㄹㄴㅇ륭ㅅ롯ㅇㄹ혹ㄴㅇㅎㄷㄱㅇㅎㅇㄹ퓨",
  birthday: "",
  gender: "",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
  characteristic: [],
  keyword: ["9", "2", "1"],
  relatedEvent: [],
}
,{
  _id: "4",
  ch_name: "ㅇ롱ㄹ혿ㄱ욯ㅇㄹ퓽류",
  ch_image: "https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911",
  isMain: true,
  role: "ㅎㄱㄴㅎㄱㅇㄹㅍㄷㄱㅎㄹㅇㅍㅇ퓨",
  birthday: "",
  gender: "",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.",
  characteristic: [],
  keyword: ["3","6","7","14"],
  relatedEvent: [],
}
];

export const getCharacterKeywordListMock = (workspace_id:string) => async () => {
  return JSON.parse(JSON.stringify(mockKeywordList)) as TKeyword[];
}

export const getCharacterListMock = (workspace_id:string) => async () => {
  return JSON.parse(JSON.stringify(mockCharacterList)) as TCharacter[];
}

export const createCharacterKeywordMock = (workspace_id:string) => async ({keyword_name, lightColor, darkColor}:{keyword_name:string, lightColor?:string, darkColor?:string}) => {
  const randomColorList = [[
    colorSystem.red200,
    colorSystem.orange200,
    colorSystem.blue200,
    colorSystem.green200,
    colorSystem.purple200,
    colorSystem.darkYellow200,
  ],[
    colorSystem.red500,
    colorSystem.orange500,
    colorSystem.blue500,
    colorSystem.green500,
    colorSystem.purple500,
    colorSystem.darkYellow600,
  ]];
  
  if(lightColor === undefined)
    lightColor = randomColorList[0][Math.floor(Math.random() * randomColorList[0].length)];
  if(darkColor === undefined)
    darkColor = randomColorList[1][Math.floor(Math.random() * randomColorList[1].length)];
  mockKeywordList.push({
    _id: Math.random().toString(36).substring(7),
    keyword_name,
    lightColor,
    darkColor,
  });
}

export const createCharacterMock = (workspace_id:string) => async () => {
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
    relatedEvent: []
  });
}

export const deleteCharacterKeywordMock = (workspace_id:string) => async (keyword_id:string) => {
  const index = mockKeywordList.findIndex((k) => k._id === keyword_id);
  if(index === -1) return;
  mockKeywordList.splice(index, 1);
}

export const deleteCharacterMock = (workspace_id:string,character_id:string) => async () => {
  const index = mockCharacterList.findIndex((c) => c._id === character_id);
  if(index === -1) return;
  mockCharacterList.splice(index, 1);
}

export const getCharacterMock = (workspace_id:string,character_id:string) => async ()=> {
  return JSON.parse(JSON.stringify(mockCharacterList.find((c) => c._id === character_id))) as TCharacter;
}

const generateUpdateCharacterMock = <T extends keyof TCharacter>(key:T) => (workspace_id:string, character_id:string) => async (value: TCharacter[T]) => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  character[key] = value;
}

export const updateCharacterNameMock = generateUpdateCharacterMock("ch_name");
export const updateCharacterRoleMock = generateUpdateCharacterMock("role");
export const updateCharacterGenderMock = generateUpdateCharacterMock("gender");
export const updateCharacterBirthdayMock = generateUpdateCharacterMock("birthday");
export const updateCharacterDescriptionMock = generateUpdateCharacterMock("description");

export const setMainCharacterMock = (workspace_id:string) => async (character_id:string) => {
  generateUpdateCharacterMock("isMain")(workspace_id,character_id)(true);
}

export const removeMainCharacterMock = (workspace_id:string) => async (character_id:string) => {
  generateUpdateCharacterMock("isMain")(workspace_id,character_id)(false);
}

export const updateCharacterCoverImageMock = (workspace_id:string,character_id:string)=> async(file: File) => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      character.ch_image = e.target?.result as string;
      resolve(null);
    }
    reader.readAsDataURL(file);
  });
}

export const addCharacterKeywordMock = (workspace_id:string, character_id:string) => async (keyword_id:string) => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  character.keyword.push(keyword_id);
}

export const removeCharacterKeywordMock = (workspace_id:string, character_id:string) => async (keyword_id:string) => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  character.keyword = character.keyword.filter((k) => k !== keyword_id);
}

export const addCharacterCharacteristicMock = (workspace_id:string, character_id:string) => async () => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  character.characteristic.push({title: "", content: ""});
}

export const updateCharacterCharacteristicTitleMock = (workspace_id:string, character_id:string) =>
  async ({index,title}:{index:number, title:string}) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if(!character) return;
    character.characteristic[index].title = title;
}

export const updateCharacterCharacteristicContentMock = (workspace_id:string, character_id:string) =>
  async ({index,content}:{index:number, content:string}) => {
    const character = mockCharacterList.find((c) => c._id === character_id);
    if(!character) return;
    character.characteristic[index].content = content;
}

export const removeCharacterCharacteristicMock = (workspace_id:string, character_id:string) => async (index:number) => {
  const character = mockCharacterList.find((c) => c._id === character_id);
  if(!character) return;
  character.characteristic.splice(index, 1);
}

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

export const getCharacterRelationMock = (workspace_id:string) => async () => {
  return JSON.parse(JSON.stringify(CharacterRelationMock)) as TRelation[];
}

export const createCharacterRelationMock = (workspace_id:string) => async ({arrow_text_right, arrow_text_left, start_ch, end_ch}:{arrow_text_right:string, arrow_text_left:string, start_ch:string, end_ch:string}) => {
  CharacterRelationMock.push({
    _id: Math.random().toString(36).substring(7),
    arrow_right: true,
    arrow_left: true,
    arrow_text_right,
    arrow_text_left,
    start_ch,
    end_ch,
  });
}

export const deleteCharacterRelationMock = (workspace_id:string) => async (relation_id:string) => {
  const index = CharacterRelationMock.findIndex((r) => r._id === relation_id);
  if(index === -1) return;
  CharacterRelationMock.splice(index, 1);
}

export const updateCharacterRelationMock = (workspace_id:string) => async ({relation_id, arrow_text_right, arrow_text_left}:{relation_id:string, arrow_text_right:string, arrow_text_left:string}) => {
  const relation = CharacterRelationMock.find((r) => r._id === relation_id);
  if(!relation) return;
  relation.arrow_text_right = arrow_text_right;
  relation.arrow_text_left = arrow_text_left;
}


const mockScriptList: any[] = [
  {
    id: "1",
    script_name: "원치 않았던 고백",
    contents: "",
  },
  {
    id: "2",
    script_name: "원숭이도 고장날 때가 있다",
    contents: "",
  },
  {
    id: "3",
    script_name: "원하는 만큼, 고지식하게",
    contents: "",
  },
  {
    id: "4",
    script_name: "원더풀 고양이",
    contents: "",
  },
];

export const getScript = async (scriptId: string) => {
  return mockScriptList.find((script) => script.id === scriptId);
}

export const updateScriptContents = (scriptId: string) => async (contents: string) => {
  const script = mockScriptList.find((script) => script.id === scriptId);
  if(script) script.contents = contents;
}

export const generagePlotAndCharacterByScriptMock = (workspace_id:string, script_id:string) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPlotId = await createPlotMock(workspace_id)();
  mockPlotFolderList.files.push({
    isFolder: false,
    _id: newPlotId,
    file_name: "플롯",
    isPinned: false,
  });
  await updatePlot(newPlotId);
  createCharacterKeywordMock(workspace_id)({keyword_name: "AI생성"});
const ai생성 = mockKeywordList.find((k) => k.keyword_name === "AI생성")!;

createCharacterKeywordMock(workspace_id)({keyword_name: "지식"});
createCharacterKeywordMock(workspace_id)({keyword_name: "지혜"});
createCharacterKeywordMock(workspace_id)({keyword_name: "자립"});
createCharacterKeywordMock(workspace_id)({keyword_name: "자신감"});

createCharacterKeywordMock(workspace_id)({keyword_name: "아름다움"});
createCharacterKeywordMock(workspace_id)({keyword_name: "친절"});
createCharacterKeywordMock(workspace_id)({keyword_name: "이해력"});

createCharacterKeywordMock(workspace_id)({keyword_name: "비판"});
createCharacterKeywordMock(workspace_id)({keyword_name: "자기애"});

createCharacterKeywordMock(workspace_id)({keyword_name: "부"});
createCharacterKeywordMock(workspace_id)({keyword_name: "거만함"});
createCharacterKeywordMock(workspace_id)({keyword_name: "관대함"});

createCharacterKeywordMock(workspace_id)({keyword_name: "자존심"});
createCharacterKeywordMock(workspace_id)({keyword_name: "미모"});
createCharacterKeywordMock(workspace_id)({keyword_name: "자만심"});
createCharacterKeywordMock(workspace_id)({keyword_name: "우스움"});

createCharacterKeywordMock(workspace_id)({keyword_name: "위선"});
createCharacterKeywordMock(workspace_id)({keyword_name: "광기"});
createCharacterKeywordMock(workspace_id)({keyword_name: "우둔함"});

const 지식 = mockKeywordList.find((k) => k.keyword_name === "지식")!;
const 지혜 = mockKeywordList.find((k) => k.keyword_name === "지혜")!;
const 자립 = mockKeywordList.find((k) => k.keyword_name === "자립")!;
const 자신감 = mockKeywordList.find((k) => k.keyword_name === "자신감")!;
const 아름다움 = mockKeywordList.find((k) => k.keyword_name === "아름다움")!;
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


  const mockCharacterList2: TCharacter[] =  [
    {
      _id: "1",
      ch_name: "엘리자베스 베네트",
      ch_image: null,
      isMain: true,
      role: "주인공",
      birthday: "",
      gender: "여성",
      description: "지적이고 명석한 젊은 여성으로, 자존심이 강하고 독립적이다.",
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
      description: "아름답고 온화한 젊은 여성으로, 타인의 감정을 잘 이해한다.",
      characteristic: [],
      keyword: [ai생성._id,아름다움._id, 친절._id, 이해력._id],
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
      keyword: [ai생성._id,지식._id, 비판._id, 자기애._id],
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
      keyword: [ai생성._id,부._id, 거만함._id, 관대함._id],
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
      keyword: [ai생성._id,부._id, 미모._id, 자존심._id, 거만함._id],
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
      description: "자만심이 강하고 우스운 성격으로, 엘리자베스에게 거절당한다.",
      characteristic: [],
      keyword: [ai생성._id,자만심._id, 우스움._id],
      relatedEvent: [],
    },
  ];

  mockCharacterList.push(...mockCharacterList2);
  return newPlotId;
}
