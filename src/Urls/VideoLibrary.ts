import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const getAllVideosUrl = (className: string) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/videos`,
    method: "GET",
    params: { className },
  });

export const createVideo = (className: string) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/videos`,
    method: "GET",
    params: { className },
  });
