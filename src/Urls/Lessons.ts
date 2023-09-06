import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const getAllLessonsUrl = (
  lessonName?: string,
  page?: number,
  size?: number
) => {
  return request({
    url: `${ADMIN_BASE_URL}/lessons?subject=${lessonName}`,
    method: "GET",
    params: { page, size },
  });
};

export const getAllSubjectsUrl = (className: string) => {
  console.log(className, "url")
  return request({
    url: `class/${className}/subjects`,
    method: "GET",
  });
};

export const getAllClassesUrl = () =>
  request({
    url: `${ADMIN_BASE_URL}/class/get-all`,
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

export const deleteClassUrl = (id: number) =>
  request({
    url: `class/${id}`,
    method: "DELETE",
  });

export const deactivateUrl = (name: string) =>
  request({
    url: `class/${name}/deactivate`,
    method: "PUT",
  });

export const activateUrl = (name: string) =>
  request({
    url: `class/${name}/activate`,
    method: "PUT",
  });

export const deactivateSubjectUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/subject/${id}/deactivate`,
    method: "GET",
  });

export const activateSubjectUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/subject/${id}/activate`,
    method: "GET",
  });

export const deactivateTopicUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/lesson/${id}/deactivate`,
    method: "GET",
  });

export const activateTopicUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/lesson/${id}/activate`,
    method: "GET",
  });

export const deactivateSubtopicUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/sub-topic/${id}/deactivate`,
    method: "GET",
  });

export const activateSubtopicUrl = (id: string | number) =>
  request({
    url: `${ADMIN_BASE_URL}/class/sub-topic/${id}/activate`,
    method: "GET",
  });
