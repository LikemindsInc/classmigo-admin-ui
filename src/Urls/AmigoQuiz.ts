import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

const BASE_URL = "admin/amigo";
const BASE_URL_PRACTICE = "admin/practice-quiz";
export const scheduleAmigoQuizUrl = (data: any) =>
  request({
    url: `${BASE_URL}/quiz/create`,
    method: "POST",
    data: data,
  });

export const updateAmigoQuizUrl = (data: any, id: string) =>
  request({
    url: `${BASE_URL}/quiz/${id}/update`,
    method: "PUT",
    data: data,
  });
export const getAmigoQuizUrl = (filter: { className: string }) => {
  const generatedParams = generateUrlParams(filter);
  return request({
    url: `${BASE_URL}/quiz/?${generatedParams}`,
    method: "GET",
  });
};

export const getAmigoQuizQuestionUrl = () =>
  request({
    url: `${BASE_URL}/quiz`,
    method: "GET",
  });

export const getAmigoQuizSingleQuestionsUrl = (id: string) =>
  request({
    url: `${BASE_URL}/${id}/questions`,
    method: "GET",
  });

export const getPracticeQuestionUrl = () =>
  request({
    url: `admin/practice-quiz/quiz`,
    method: "GET",
  });

export const createAmigoQuizQuestionUrl = (data: any) =>
  request({
    url: `${BASE_URL}/quiz/add-questions`,
    method: "PUT",
    data: data,
  });

export const deleteAmigoQuizUrl = (id: string) =>
  request({
    url: `${BASE_URL}/quiz/${id}/delete`,
    method: "DELETE",
  });

//   export const deleteAmigoQuizQuestionUrl = (id: string) =>
//   request({
//     url: `${BASE_URL}/quiz/${id}/delete`,
//     method: "DELETE",
//   });
//practice quiz

export const schedulePracticeQuizUrl = (data: any) =>
  request({
    url: `${BASE_URL_PRACTICE}/create`,
    method: "POST",
    data: data,
  });

export const getPracticeQuizUrl = () =>
  request({
    url: `${BASE_URL_PRACTICE}/quiz`,
    method: "GET",
  });

export const createPracticeQuizQuestionUrl = (data: any) =>
  request({
    url: `${BASE_URL_PRACTICE}/add-questions`,
    method: "PUT",
    data: data,
  });

export const deletePracticeQuizUrl = (id: string) =>
  request({
    url: `${BASE_URL_PRACTICE}/${id}/delete`,
    method: "DELETE",
  });

export const uploadQuestionsUrl = (data: any, id: string, ) =>
  request({
    url: `${BASE_URL}/${id}/questions/upload`,
    method: "POST",
    data: data,
  });

//Leaderboard

export const getLeaderboardUrl = (filter?: any) => {
  const generatedParam = generateUrlParams(filter);
  return request({
    url: `${BASE_URL}/students/leaderboard?${generatedParam}`,
    method: "GET",
  });
};

export const getSingleLeaderboardUrl = (id: string) => {
  return request({
    url: `${BASE_URL}/quiz/${id}/leaderboard`,
    method: "GET",
  });
};
