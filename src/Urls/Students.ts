import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

const ADMIN_BASE_URL = "admin";

export const getStudentDataUrl = (filter?: any) => {
  const generatedParam = generateUrlParams(filter);
  return request({
    url: `${ADMIN_BASE_URL}/students${generatedParam}`,
    method: "GET",
  });
};

export const toggleStudentUrl = (data: any, id: string) => {
  return request({
    url: `${ADMIN_BASE_URL}/student/${id}/toggle-state`,
    method: "PUT",
    data: data,
  });
};

export const toggleParentUrl = (data: any, id: string) => {
  return request({
    url: `${ADMIN_BASE_URL}/parent/${id}/toggle-state`,
    method: "PUT",
    data: data,
  });
};

export const unlinkParentUrl = (studentId: any, parentId: any) => {
  return request({
    url: `${ADMIN_BASE_URL}/student/${studentId}/parent/${parentId}/unlink`,
    method: "GET",
  });
};
