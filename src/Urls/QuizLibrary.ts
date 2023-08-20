import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const addQuestionUrl = (data:any) => {
    return request({
        url: `${ADMIN_BASE_URL}/quiz/create-questions`,
        method: "POST",
        data: data
    });
 }