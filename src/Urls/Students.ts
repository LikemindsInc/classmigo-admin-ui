import { request } from "../utils/requestProcessor";

const BASE_URL = "student";

export const getStudentDataUrl = () => request(
    {   
        url: `${BASE_URL}/subscription`,
        method: "GET",
    }
)