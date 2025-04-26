import axios from "../axios";
import { UserProfile } from "../Models/UserModel";
import { handleError } from "./HandleErrorService";

export async function login(username: string, password: string) {
  try {
    const res = await axios.post<UserProfile>("/account/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const res = await axios.post("/account/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
  }
}
