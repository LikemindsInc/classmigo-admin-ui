import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

export const getPaymentDataUrl = (filter?:any) => {
  const generatedParam = generateUrlParams(filter);
  return request({
    url: `${ADMIN_BASE_URL}/students/subscriptions${generatedParam}`,
    method: "GET",

  });
};


export const getSubscriptionDataUrl = (id:string) => {
  return request({
    url: `${ADMIN_BASE_URL}/student-subscription/${id}/payment-detail`,
    method: "GET",
  });
};