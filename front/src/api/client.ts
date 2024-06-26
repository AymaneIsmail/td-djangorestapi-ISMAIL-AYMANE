import axios from "axios";

export const api = axios.create({
  baseURL: 'localhost:8000/api/v1/',
});



export function setClientAccessToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}