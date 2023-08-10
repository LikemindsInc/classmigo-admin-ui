import { request } from "../utils/requestProcessor";

const BASE_URL = "admin";

export const getParentDataUrl = (page?: number, pageSize?: number) =>
  request({
    url: `${BASE_URL}/parents`,
    method: "GET",
    params: { page, pageSize },
  });

export const getParentUrl = (parentId: number) =>
  request({
    url: `${BASE_URL}/parent/${parentId}/accounts`,
    method: "GET",
  });
