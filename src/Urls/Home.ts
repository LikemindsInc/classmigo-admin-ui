import { request } from "../utils/requestProcessor";

const BASE_URL = `admin/dashboard`

export const getDashboardAnalytics = () => request(
    {   
        url: `${BASE_URL}/analytics`,
        method: "GET",
    }
)