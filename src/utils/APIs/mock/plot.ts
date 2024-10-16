import { TPlot, TPlotEvent } from "../types";

export interface responseGetPlotType {
  _id: string;
  plot_name: string;
  chapters: ChapterType[];
  is_starred: boolean;
  is_folded: boolean;
}

export type ChapterType = {
  _id: string;
  chapter_name: string;
  chapter_description: string;
  order: number;
  pevent: TPlotEvent[];
};

export const mockPlotList: responseGetPlotType = {
  _id: "1",
  plot_name: "vfmhjslfl",
  chapters: [
    {
      _id: "12",
      chapter_name: "사랑",
      chapter_description: "사랑해라",
      order: 0,
      pevent: [
        {
          _id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",
          plot_id: "string;",
          order: 0,
          author: "string;",
          work_id: "string;",
          last_modify_date: "yesterday",
          pevent_character: [
            {
              _id: "strinddg",
              ch_image: "string",
              is_starred: false,
              author: "string;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "string;",
              id: " string;",
            },
            {
              _id: "string2s",
              ch_image: "string",
              is_starred: false,
              author: "string2;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "string;",
              id: " string;1",
            },

            {
              _id: "stringd1",
              ch_image: "string",
              is_starred: false,
              author: "string;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "한태산",
              id: "2string;",
            },
            {
              _id: "string",
              ch_image: "string",
              is_starred: false,
              author: "string;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "string;",
              id: " string;",
            },
            {
              _id: "string2",
              ch_image: "string",
              is_starred: false,
              author: "string2;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "string;",
              id: " string;1",
            },

            {
              _id: "string1",
              ch_image: "string",
              is_starred: false,
              author: "string;",
              work_id: " string;",
              last_modify_date: "string;",
              created_at: "string;",
              ch_name: "한태산",
              id: "2string;",
            },
          ],
        },
        {
          _id: "3",
          event_description: "gg",
          event_name: "string;",
          plot_id: "string;",
          order: 1,
          author: "string;",
          work_id: "string;",
          last_modify_date: "yesterday",
          pevent_character: [],
        },
        {
          _id: "2",
          event_description: "kk",
          event_name: "string;",
          plot_id: "string;",
          order: 2,
          author: "string;",
          work_id: "string;",
          last_modify_date: "yesterday",
          pevent_character: [],
        },
      ],
    },
    {
      _id: "13",
      chapter_name: "사랑ss",
      chapter_description: "사랑해라",
      order: 0,
      pevent: [
        {
          _id: "1",
          event_description: "ㅋㅋ",
          event_name: "string;",
          plot_id: "string;",
          order: 0,
          author: "string;",
          work_id: "string;",
          last_modify_date: "yesterday",
          pevent_character: [],
        },
      ],
    },
  ],
  is_starred: true,
  is_folded: true,
};
