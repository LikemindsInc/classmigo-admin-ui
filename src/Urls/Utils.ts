import { request } from "../utils/requestProcessor";

export const uploadImageUrl = (data: any) => {
  request({
    url: `admin/upload`,
    method: "POST",
    data: data,
  });
};
