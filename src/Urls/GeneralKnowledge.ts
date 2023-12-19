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

export const getGeneralQuestions = (filter: any) => {
  return request({
    url: `${ADMIN_BASE_URL}/generalknowledge?${generateUrlParams(filter)}`,
    method: "GET",
  });
};

export const deleteGeneralQuestionUrl = (id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/generalknowledge/${id}`,
    method: "DELETE",
  });
};

export const updateGeneralQuestionUrl = (data: any, id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/generalknowledge/${id}`,
    method: "PATCH",
    data: data,
  });
};

export const generalKnowledgeBulkUpload = (data: any) => {
  console.log(data," dtaatatsypayload")
  return request({
    url: `${ADMIN_BASE_URL}/generalknowledge/bulk-upload`,
    method: "POST",
    data,
  });
};
