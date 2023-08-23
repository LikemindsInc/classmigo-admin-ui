import { ADMIN_BASE_URL } from "../utils/constants";
import { request } from "../utils/requestProcessor";

export const updateWeek = (data: any, id: string | number) => {
  console.log(id, "siiiiuuu");
  console.log("Request URL:", `${ADMIN_BASE_URL}/lesson/${id}/update-week`);
  return request({
    url: `${ADMIN_BASE_URL}/lesson/${id}/update-week`,
    method: "PUT",
    data: data,
  });
};
