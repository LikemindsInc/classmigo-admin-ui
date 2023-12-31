import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const getAllVideosUrl = (className: string) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/videos`,
    method: "GET",
    params: { lessonId: className },
  });

export const createVideoUrl = (data: any) => {
  console.log(data, "hah");
  return request({
    url: `${ADMIN_BASE_URL}/lesson/video/create`,
    method: "POST",
    data: data,
  });
};
