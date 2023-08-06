import { request } from "../utils/requestProcessor";

const BASE_URL = "auth/login";

export const loginUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/admin`,
        method: "POST",
        data: data
    }
)