import { request } from "../utils/requestProcessor";

const BASE_URL = "admin/amigo";

export const scheduleAmigoQuizUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/quiz/create`,
        method: "POST",
        data: data
    }
)

export const updateAmigoQuizUrl = (data:any, id:string) => request(
    {   
        url: `${BASE_URL}/quiz/${id}/update`,
        method: "PUT",
        data: data
    }
)
export const getAmigoQuizUrl = () => request(
    {   
        url: `${BASE_URL}/quiz`,
        method: "GET",
    }
)

export const getAmigoQuizQuestionUrl = () => request(
    {   
        url: `${BASE_URL}/quiz`,
        method: "GET",
    }
)

export const getPracticeQuestionUrl = () => request(
    {   
        url: `admin/practice-quiz/quiz`,
        method: "GET",
    }
)

export const createAmigoQuizQuestionUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/quiz/add-questions`,
        method: "PUT",
        data: data
    }
)



export const deleteAmigoQuizUrl = (id:string) => request(
    {   
        url: `${BASE_URL}/quiz/${id}/delete`,
        method: "DELETE",
    }
)