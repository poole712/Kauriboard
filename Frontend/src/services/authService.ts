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

async function getprojects() {
  try {
    const response = await instance.get("/Projects");
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{ message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured getting projects"
    }
  };
}

async function createproject(name : string, description : string) {
  try {
    const response = await instance.post("/Projects", {
      name, 
      description
    });
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{ message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured creating project"
    }
  };
}

async function getprojectmembers(projectId: number) {
  try {
    const response = await instance.get(`/Projects/GetProjectMembers/${projectId}`);
    return { ok: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred getting project members",
    };
  }
}

function logout() {
  return instance.post("/auth/logout");
}

export { login, logout, register, getprojects, createproject, getprojectmembers };