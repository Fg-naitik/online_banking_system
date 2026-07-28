import api from "../services/api";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};