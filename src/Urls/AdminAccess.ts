import { IAdmin, ICreateAdminDTO } from "@appModel";
import { request } from "../utils/requestProcessor";

const BASE_URL = `admin`;

export const getAllAdmins = () =>
  request({
    url: `${BASE_URL}/users`,
    method: "GET",
  }) as Promise<IAdmin[]>;

export const getSingleAdmin = (id: string) =>
  request({
    url: `${BASE_URL}/user/${id}`,
    method: "GET",
  }) as Promise<IAdmin>;

export const createAdminAccess = (data: ICreateAdminDTO) =>
  request({
    url: `${BASE_URL}/user/create`,
    method: "POST",
    data: data,
  });

export const blockAdminAccess = (id: string, data: any) =>
  request({
    url: `${BASE_URL}/user/${id}/block`,
    method: "PUT",
    data,
  });

export const updatePassword = ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) =>
  request({
    url: `${BASE_URL}/user/${userId}/password-update`,
    method: "PUT",
    data: { password },
  });

export const unBlockAdminAccess = (id: string, data: any) =>
  request({
    url: `${BASE_URL}/user/${id}/unblock`,
    method: "PUT",
    data,
  });

export const assignClassToAdmin = ({ className, accountId }: any) =>
  request({
    url: `${BASE_URL}/class/${className}/assign-teacher`,
    method: "PUT",
    data: { accountId },
  });

export const unAssignClassFromAdmin = ({ className, accountId }: any) =>
  request({
    url: `${BASE_URL}/class/${className}/unassign-teacher`,
    method: "PUT",
    data: { accountId },
  });
