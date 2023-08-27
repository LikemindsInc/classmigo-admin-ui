import { request } from "../utils/requestProcessor";

const ADMIN_BASE_URL = "admin";

export const getStudentDataUrl = (page?: number, pageSize?: number) =>
  request({
    url: `${ADMIN_BASE_URL}/students`,
    method: "GET",
    params: { page, pageSize },
  });

export const toggleStudentUrl = (data:any, id: string) => {
  return request({
    url: `${ADMIN_BASE_URL}/student/${id}/toggle-state`,
    method: "PUT",
    data:data
  });
};

export const toggleParentUrl = (data:any, id: string) => {
  return request({
    url: `${ADMIN_BASE_URL}/parent/${id}/toggle-state`,
    method: "PUT",
    data:data
  });
};