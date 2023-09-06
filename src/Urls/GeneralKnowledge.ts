import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";


export const addGeneralKnowledgeUrl = (data: any) => {
    return request({
      url: `${ADMIN_BASE_URL}/generalKnowledge/create`,
      method: "POST",
      data: data,
    });
};
  

export const getGeneralQuestions = (filter:any) => {
    return request({
      url: `${ADMIN_BASE_URL}/generalknowledge?${generateUrlParams(filter)}`,
      method: "GET",
    });
  };