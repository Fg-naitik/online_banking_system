import api from "../services/api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};
export const getAllTransactions = async () => {
  const res = await api.get("/admin/transactions");
  return res.data;
};
export const getAllLoans = async () => {
  const res = await api.get("/admin/loans");
  return res.data;
};