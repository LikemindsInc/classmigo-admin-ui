import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

const BASE_URL = "billing";
export const createSubscription = (data: any) => {
  return request({
    url: `${BASE_URL}/subscription`,
    method: "POST",
    data: data,
  });
};

export const getSubscriptions = () => {
  return request({
    url: `${BASE_URL}/subscription-plans`,
    method: "GET",
  });
};

export const deleteSubscription = (id: any) => {
  return request({
    url: `${BASE_URL}/subscription/${id}`,
    method: "DELETE",
  });
};

export const toggleSubscription = (data:any, id: any) => {
  return request({
    url: `${BASE_URL}/subscription/${id}/toggle-active`,
    method: "PUT",
    data: data,
  });
};

export const updateSubscription = (data: any, id: any) => {
  return request({
    url: `${BASE_URL}/subscription/${id}`,
    method: "PATCH",
    data: data,
  });
};

export const getSubscriptionAnalytics = (filter: any) => {
  return request({
    url: `${BASE_URL}/subscription/analytics?${generateUrlParams(filter)}`,
    method: "GET",
  });
};
