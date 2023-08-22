import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const addQuestionUrl = (data: any) => {
  return request({
    url: `${ADMIN_BASE_URL}/quiz/create-questions`,
    method: "POST",
    data: data,
  });
};

export const createQuizUrl = (data: any) => {
  return request({
    url: `${ADMIN_BASE_URL}/quiz/create`,
    method: "POST",
    data: data,
  });
};

export const getAllQuizUrl = (classParam: string) => {
  return request({
    url: `${ADMIN_BASE_URL}/quiz/get-all`,
    method: "GET",
    params: { className: classParam },
  });
};
export const getQuizQuestions = (id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/quiz/${id}`,
    method: "GET",
  });
};

export const deleteQuiz = (id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/quiz/${id}`,
    method: "DELETE",
  });
};
