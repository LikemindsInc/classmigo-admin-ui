import { request } from "../utils/requestProcessor";

const ADMIN_BASE_URL = "admin";

export const getStudentDataUrl = (
  filter?:any
) =>
  
  request({
    url: `${ADMIN_BASE_URL}/students`,
    method: "GET",
    params: {
      ...filter
    },
  });

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


export const unlinkParentUrl = (studentId:any, parentId:any) => {
  return request({
    url: `${ADMIN_BASE_URL}/student/${studentId}/parent/${parentId}/unlink`,
    method: "GET"
  })
}