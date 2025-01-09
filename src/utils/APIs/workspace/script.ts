import axiosInstance from "../axiosInstance";

export const getScriptInfo = (script_id: string) => async () => {
  //const response = await axiosInstance.get<TScript>(DOMAIN.GET_SCRIPT_INFO(script_id));

  //return response.data;
  return { id: "1", script_name: "script1", script_content: "content1" };
};
