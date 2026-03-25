import React, { useState } from 'react';
import Axios, { LOGIN } from '../../Api/Api';
import Cookie from 'cookie-universal';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/Auth.css';

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const cookie = Cookie();
    const navigate = useNavigate();
     
    // handleChange
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
     
    // handleSubmit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErr('');

        try {
            const res = await Axios.post(`${LOGIN}`, {
                email: form.email,
                password: form.password
            });
            console.log(res);
            setLoading(false);
            const token = res.data.token;
            const user = res.data.user;

            cookie.set('educational-token', token);
            cookie.set('educational-user', JSON.stringify(user));

            if (user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

        } catch (error) {
            setLoading(false);
            if (error.response?.status === 422 || error.response?.status === 401) {
                setErr('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            } else {
                setErr('حدث خطأ في الخادم، حاول مرة أخرى');
            }
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>تسجيل الدخول</h2>
                <p className="auth-subtitle">مرحباً بعودتك!</p>

                {err && <div className="error-message">{err}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="أدخل كلمة المرور"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </button>
                </form>

                <p className="auth-footer">
                    ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link> 
                </p>
            </div>
        </div>
    );
}

