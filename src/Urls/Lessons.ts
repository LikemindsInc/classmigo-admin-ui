import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const getAllLessonsUrl = (lessonName?: string) =>
  request({
    url: `${ADMIN_BASE_URL}/lessons?subject=${lessonName}`,
    method: "GET",
  });
export const getAllSubjectsUrl = (className: string) =>
  request({
    url: `class/${className}/subjects`,
    method: "GET",
  });

export const getAllClassesUrl = () =>
  request({
    url: `class/get-all`,
    method: "GET",
  });

export const createClassUrl = (data: any) =>
  request({
    url: `class/create`,
    method: "POST",
    data: data,
  });

export const createSubjectUrl = (data: any) =>
  request({
    url: `${ADMIN_BASE_URL}/class/subject/create`,
    method: "POST",
    data: data,
  });

export const getSubTopicsUrl = (id: number) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/${id}/subTopics`,
    method: "GET",
  });

//post requests
export const addTopicUrl = (data: any) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/create`,
    method: "POST",
    data: data,
  });

export const addSubTopicUrl = (data: any, id: number) =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/${id}/add-subTopic`,
    method: "POST",
    data: data,
  });

export const getLessonVideosUrl = () =>
  request({
    url: `${ADMIN_BASE_URL}/lesson/videos`,
    method: "GET",
  });

  export const deleteClassUrl = (id: number) =>
  request({
    url: `class/${id}`,
    method: "DELETE",
  });
  