import axios from "axios";
import Strings from "./Strings";

const BASE_URL = Strings.API_ROUTE;
export const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});