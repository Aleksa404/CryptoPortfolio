import axios from "../axios";

interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string) {
  const res = await axios.post<LoginResponse>("/account/login", {
    username,
    password,
  });
  localStorage.setItem("token", res.data.token);
  console.log("Token set in localStorage:", res.data.token);
  return res.data;
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
  const res = await axios.post("/account/register", {
    username,
    email,
    password,
  });
  return res.data;
}
