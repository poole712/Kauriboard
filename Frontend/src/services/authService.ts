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
      status: error.response?.status,
      error: error.response?.data?.message || "An error occured getting projects"
    }
  };
}

async function getproject(id : string) {
  try {
    const response = await instance.get(`/Projects/${id}`);
    return { ok: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred getting project",
    };
  }
}

async function gettasks(projectId : string) {
  try {
    const response = await instance.get(`/Tasks/${projectId}/getall`)
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred getting tasks",
    };
  }
}

async function gettask(taskId : string) {
  try {
    const response = await instance.get(`/Tasks/${taskId}`)
    return { ok: true, data: response.data}
  } catch (err) {
    const error = err as AxiosError<{message : string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured getting task"
    }
    
  }
  
}

async function createtask(name : string, description : string, status : string, assignedToUserId : number, projId : string) {
  try {
    const response = await instance.post(`/Tasks`, {
      ProjectId : projId,
      name: name,
      description: description,
      status: status,
      assignedToUserId: assignedToUserId
    });
    return { ok: true, data: response.data}
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured posting task"
    }
  }
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

async function gettaskswithstatus(status : string, projectId : string) {
  try {
    const response = await instance.get(`/Tasks/${projectId}/status/${status}`)
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured getting tasks with status"
    }
  }
} 

async function updatetask(id : number, name : string, description : string, status : string) {
  try {    
    const response = await instance.put(`/Tasks/${id}`, {
      name: name,
      description: description,
      status: status,
    });
    return { ok: true, data: response.data}
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured updating task"
    }
  }
}

async function deletetask(id : string) {
  try {
    const response = await instance.delete(`/Tasks/${id}`);
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured deleting task"
    }
  }
}

async function inviteuser(email : string, projectId : string) {
  try {
    const response = await instance.post(`/Invites`, {
      Email: email,
      ProjectId: projectId
    });
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured inviting user"
    }
  }
}

async function acceptinvite(token : string) {
  try {
    const response = await instance.post(`/Invites/accept`, {
      token: token
    });
    return { ok: true, data: response.data};
  } catch (err) {
    const error = err as AxiosError<{message: string}>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occured accepting invite"
    }
  }
}

async function getcurrentuser() {
  try {
    const response = await instance.get("/Users/me");
    return { ok: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error: error.response?.data?.message || "An error occurred getting current user",
    };
  }
}

async function removemember(projId : string, userId : string) {
  try {
    const response = await instance.post("/Projects/RemoveMember", {
      projId : projId,
      userId : userId
    });
    return { ok : true, data : response.data}
  } catch (err) {
    const error = err as AxiosError<{message : string}>;
    return { 
      ok : false, 
      message : error.response?.data?.message || 'An error occured removing user'}
  }
}

function logout() {
  return instance.post("/auth/logout");
}

export { login, logout, register, getprojects, createproject, getprojectmembers, getproject, gettasks, 
        gettask, createtask, gettaskswithstatus, updatetask, deletetask, inviteuser, acceptinvite, getcurrentuser, removemember };