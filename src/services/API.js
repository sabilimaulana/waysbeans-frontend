import axios from "axios";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const API = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
