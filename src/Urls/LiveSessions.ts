import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const createLiveLessonUrl = (data:any) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/create-live-lesson`,
    method: "POST",
    data: data,
  });

export const updateLiveLesson = (data:any, id:string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/live-lesson/${id}/update`,
    method: "PATCH",
    data:data
  });


export const getLiveLessons = () =>
request({
  url: `${ADMIN_BASE_URL}/live-lessons`,
  method: "GET",
});

export const cancelLiveLesson = (id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/live-lessons/${id}/cancel`,
    method: "PUT",
  });
}

