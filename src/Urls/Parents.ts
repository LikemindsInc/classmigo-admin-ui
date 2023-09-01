import { request } from "../utils/requestProcessor";

const BASE_URL = "admin";

export const getParentDataUrl = (filter?:any) =>
  request({
    url: `${BASE_URL}/parents`,
    method: "GET",
    params: { ...filter },
  });

export const getParentUrl = (parentId: number) =>
  request({
    url: `${BASE_URL}/parent/${parentId}/accounts`,
    method: "GET",
  });


  export const unlinkStudentUrl = (studentId:any, parentId:any) => {
    return request({
      url: `${BASE_URL}/student/${studentId}/parent/${parentId}/unlink`,
      // method: "POST"
    })
  }