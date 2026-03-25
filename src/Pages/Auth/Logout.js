import Cookie from 'cookie-universal';
import Axios, { LOGOUT } from '../../Api/Api';

const cookie = Cookie();

// handleLogout
export async function handleLogout(navigate) {
    try {
        await Axios.post(`/${LOGOUT}`);
    } catch (error) {
        console.error('خطأ في تسجيل الخروج:', error);
    } finally {
        cookie.remove('educational-token');
        cookie.remove('educational-user');
        
        if (navigate) {
            navigate('/login');
        } else {
            window.location.pathname = '/login';
        }
    }
}