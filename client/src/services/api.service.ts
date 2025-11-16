import instance from "@/config/api.config";
import { IQRResponse } from "@/interfaces/qr.interface";
import { QueryKey } from "@tanstack/react-query";

export const register = async (data: any) => {
  const res = await instance.post("/auth/register", data);
  return res.data;
};

export const getUser = async (address: any) => {
  const res = await instance.get(`/auth/users/${address}`);
  return res.data;
};

export const generateQr = async (data: any) => {
  const res = await instance.post("/qr/generate", data);
  return res.data;
};

export const getAllQrCodes = async ({ queryKey }: { queryKey: QueryKey }) => {
  const res = await instance.get<IQRResponse>("/qr/all", {
    params: queryKey[1],
  });
  return res.data;
};

export const getQrStats = async () => {
  const res = await instance.get("/qr/stats");
  return res.data;
};

export const scanQr = async (data: any) => {
  const res = await instance.post("/qr/scan", data);
  return res.data;
};

export const getLeaderboard = async () => {
  const res = await instance.get("/analytics/leaderboard");
  return res.data;
};

export const getRecyclerLeaderboard = async () => {
  const res = await instance.get("/analytics/leaderboard", {
    params: { groupBy: "recycler" },
  });
  return res.data;
};

export const verifyQrScan = async (data: any) => {
  const res = await instance.post("/qr/verify", data);
  return res.data;
};

export const rewardDistributor = async (data: any) => {
  const res = await instance.post("/qr/distribute", data);
  return res.data;
};

export const getUserStats = async ({ queryKey }: { queryKey: QueryKey }) => {
  const res = await instance.get(`/qr/stats/${queryKey[1]}`);
  return res.data;
};
