import { request } from "../utils/requestProcessor";

const BASE_URL = "admin/amigo";

export const scheduleAmigoQuizUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/quiz/create`,
        method: "POST",
        data: data
    }
)

export const getAmigoQuizUrl = () => request(
    {   
        url: `${BASE_URL}/quiz/create`,
        method: "GET",
    }
)