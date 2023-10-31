import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";
import { generateUrlParams } from "../utils/utilFns";

export const getReferalDataUrl = (filter?: any) => {
    const generatedParam = generateUrlParams(filter);
    return request({
      url: `/agent${generatedParam}`,
      method: "GET",
    });
  };