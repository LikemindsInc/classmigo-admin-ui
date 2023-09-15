import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const updateWeek = (data: any, id: string | number) => {
  return request({
    url: `${ADMIN_BASE_URL}/lesson/${id}/update-week`,
    method: "PUT",
    data: data,
  });
};
