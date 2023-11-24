import { request } from "../utils/requestProcessor";

const BASE_URL = "auth";

export const loginUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/login/admin`,
        method: "POST",
        data: data
    }
)

export const forgotpasswordUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/admin/forgot-password/otp/send`,
        method: "POST",
        data: data
    }
)

export const resetPasswordUrl = (data:any) => request(
    {   
        url: `${BASE_URL}/admin/password-reset-with-token`,
        method: "POST",
        data: data
    }
)
