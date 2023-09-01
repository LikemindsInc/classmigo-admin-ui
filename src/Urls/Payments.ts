import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const getPaymentDataUrl = (page?: number, pageSize?: number) =>
  request({
    url: `${ADMIN_BASE_URL}/students/subscriptions`,
    method: "GET",
    params: { page, pageSize },
  });
