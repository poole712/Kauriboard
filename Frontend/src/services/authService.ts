import instance from "../API/axios";
import { AxiosError } from "axios";

async function login(email: string, password: string){
  try {
    const response = await instance.post("/Auth/login", {
      email,
      password,
    });
    return { ok: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred during login",
    };
  }
}

async function register (email: string, name : string, password: string) {
  try {
    const response = await instance.post("/Auth/register", {
      email,
      name,
      password,
    });
    return { ok: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred during registration",
    };
  }
}

function logout() {
  return instance.post("/auth/logout");
}

export { login, logout, register };
