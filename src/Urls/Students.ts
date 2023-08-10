import { request } from "../utils/requestProcessor";

const BASE_URL = "admin";

export const getStudentDataUrl = (page?: number, pageSize?: number) =>
  request({
    url: `${BASE_URL}/students`,
    method: "GET",
    params: { page, pageSize },
  });
