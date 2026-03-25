import React, { useState } from 'react';
import Axios, { REGISTER } from '../../Api/Api';
import Cookie from 'cookie-universal';
import '../../Styles/Auth.css';
import { Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const cookie = Cookie();
    

    // handleChange
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    //  handleSubmit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErr('');

        try {
            const res = await Axios.post(`/${REGISTER}`, {
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation
            });

            setLoading(false);
            const token = res.data.token;
            const user = res.data.user;

          
            cookie.set('educational-token', token);
            cookie.set('educational-user', JSON.stringify(user));

            window.location.pathname = '/';

          

        } catch (error) {
            setLoading(false);
            if (error.response?.status === 422) {
                setErr('البريد الإلكتروني مستخدم مسبقاً');
            } else {
                setErr('حدث خطأ في الخادم، حاول مرة أخرى');
            }
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>إنشاء حساب جديد</h2>
                <p className="auth-subtitle">انضم إلى منصتنا التعليمية</p>

                {err && <div className="error-message">{err}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>الاسم الكامل</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكامل"
                            required
                        />
                    </div>

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
                            minLength="8"
                        />
                    </div>

                    <div className="form-group">
                        <label>تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            placeholder="أعد إدخال كلمة المرور"
                            required
                            minLength="8"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                    </button>
                </form>

                <p className="auth-footer">
                   لديك حساب بالفعل <Link to="/login"> تسجيل دخول</Link> 
                </p>
            </div>
        </div>
    );
}

