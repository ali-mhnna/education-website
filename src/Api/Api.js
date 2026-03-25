import axios from 'axios';
import Cookie from 'cookie-universal';
export const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
const cookie = Cookie();

const Axios = axios.create({

    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


Axios.interceptors.request.use(
    (config) => {
        const token = cookie.get('educational-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default Axios;

// --- الروابط (Endpoints) ---
export const REGISTER = 'register';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const USER = 'user';
export const COURSES = 'courses';
export const COURSES_FEATURED = 'courses/featured';
export const ADMIN_COURSES = 'admin/courses';
export const ADMIN_USERS = 'admin/users';
export const INSTRUCTORS = 'instructors';
export const ADMIN_INSTRUCTORS = 'admin/instructors';
export const MY_COURSES = 'my-courses';
export const ADMIN_ENROLLMENTS = 'admin/enrollments';
export const ADMIN_COURSE_STUDENTS = 'admin/courses';
export const INSTRUCTOR_BY_ID = 'instructors';