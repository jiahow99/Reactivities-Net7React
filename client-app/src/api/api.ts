import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../app/models/Activity";
import { User, UserFormValues } from "../app/models/User";
import { useNavigate } from "react-router-dom";



// Base URL (API)
axios.defaults.baseURL = 'http://localhost:5000/api';

// Get response.data
const response = <T> (response: AxiosResponse<T>) => response.data;

// Requests
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(response),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(response),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(response),
    delete: <T> (url: string) => axios.delete<T>(url).then(response),
}

const ActivityAPI = {
    index: () => requests.get<Activity[]>('/activity'),
    show: (id: string) => requests.get<Activity>(`/activity/${id}`),
    create: (activity: Activity) => requests.post<void>('/activity', activity),
    update: (activity: Activity) => requests.put<void>(`/activity/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activity/${id}`),
}

const AccountAPI = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

export {ActivityAPI, AccountAPI};
