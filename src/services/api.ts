import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:5001",
});

export const getTasks = (userId: string) =>
  API.get(`/tasks/user/${userId}`);

export const createTask = (data: any) =>
  API.post("/tasks/create", data);

export default API;