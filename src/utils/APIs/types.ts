export interface TFile {
  _id: string;
  isFolder: false;
  file_name: string;
  isPinned: boolean;
};

export interface TFolder {
  isFolder: true;
  folder_name: string;
  files: Array<TFile|TFolder>;
};

export interface TFileWithOptions extends TFile {
  isSelect: boolean;
  isEditing: boolean;
}

export interface TFolderWithOptions extends TFolder {
  isOpen: boolean;
  isSelect: boolean;
  isEditing: boolean;
  files: Array<TFileWithOptions|TFolderWithOptions>;
}

/**
 * 작품 정보 타입
 */
export type TWorkInfo = {
  cover: string;
  title: string;
  genre: string;
  logline: string;
  expectedQuantity: number;
  grade: null | "전체 이용가" | "12세 이용가" | "15세 이용가" | "19세 이용가";
  introduction: string;
  keyword: string[];
};

/**
 * 키워드 타입
 */
export type TKeyword = {
  _id: string;
  keyword_name: string;
  darkColor: string;
  lightColor: string;
};

/**
 * 인물 타입
 */
export type TCharacter = {
  _id: string;
  ch_name: string;
  ch_image: string;
  role: string;
  birthday: string|null;
  gender: string;
  characteristic: Array<{title: string, content: string}>;
  keyword: string[];
  relatedEvent: string[];
};

/**
 * 플롯 타입
 */
export type TPlot = {
  _id: string;
  plot_name: string;
  plot_description: string;
  order: number;
  pevent: TPlotEvent[];
  is_starred: boolean;
  is_folded: boolean;
};

/**
 * 플롯 이벤트 타입
 */
export type TPlotEvent = {
  _id: string;
  event_description: string;
  event_name: string;
  plot_id: string;
  order: number;
  author: string;
  work_id: string;
  last_modify_date: string;
  pevent_character: TPlotEventCharacter[];
};

/**
 * 플롯 이벤트 연관 인물 타입
 */
export type TPlotEventCharacter = {
  _id: string;
  ch_image: string;
  is_starred: boolean;
  author: string;
  work_id: string;
  last_modify_date: string;
  created_at: string;
  ch_name: string;
  id: string;
};

/**
 * 스토리지 메모 타입
 */
export type TStorageMemo = {
  _id: string;
  memo_name: string;
  memo_description: string;
};

/**
 * 스토리지 캐릭터 타입
 */
export type TStorageCharacter = {
  id: string;
  ch_name: string;
  ch_image: string;
  last_modify_date?: string;
  created_at?: string;
  ch_description_text?: string;
  work_id?: string;
  author?: string;
  is_starred?: boolean;
};

/**
 * 스토리지 이벤트 타입
 */
export type TStorageEvent = {
  _id: string;
  event_name: string;
  event_description: string;
};

/**
 * 유저 타입
 */
export type TUser = {
  member_name: string;
  member_image: string;
};

/**
 * 설정집 타입
 */
export type TWork = {
  _id: string;
  work_name: string;
  category: string;
  work_image: string;
  last_modify_date: string; // ISO 날짜 문자열로 정의
};

/**
 * 설정집 생성 응답 타입
 */
export type CreateWorkRes = {
  id: string;
  filePath: string;
};

/**
 * 설정집 카테고리
 */
export const category = {
  before: 'before',
  ongoing: 'ongoing',
  completed: 'completed',
};

/**
 * 설정집 인물 타입
 */
export type TWorkCharacter = {
  _id: string;
  ch_name: string;
  ch_image: string;
  ch_description_text: string;
  is_starred: boolean;
  author: string;
  work_id: string;
  last_modify_date: string;
  created_at: string;
};

export type TWorkCategory = (typeof category)[keyof typeof category];

export type TSynopsis = {
  _id: string;
  logline: string;
  genre: string;
  work_name: string;
  category: string;
  work_image: string;
  last_modify_date: string; // 또는 Date 타입을 사용할 수 있음
  duration: string;
  age_restriction: string;
  s3Url: string;
};

export type TRelation = {
  _id: string;
  arrow_right: boolean;
  arrow_left: boolean;
  arrow_text_right: string;
  arrow_text_left: string;
  start_ch: string;
  end_ch: string;
  start_ch_image: string;
  end_ch_image: string;
  start_ch_name: string;
  end_ch_name: string;
};

/* 스냅샷 관련 타입 */

export type TSnapshot = {
  _id: string;
  work_id: string;
  created_at: string;
  snapshot_name: string;
};

export type TSnapshopPreview = {
  _id: string;
  author: string;
  craeted_at: string;
  work: TSynopsis;
  snapshot_name: string;
  character_list: TWorkCharacter[];
  plot_list: TPlot[];
  pevent_list: TPlotEvent[];
  arrow_list: TRelation[];
};
