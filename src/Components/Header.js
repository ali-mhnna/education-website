import React, { useState, useEffect } from "react";
import "../Styles/Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../Pages/Auth/Logout";
import Cookie from "cookie-universal";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const cookie = Cookie();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = cookie.get("educational-user");
    if (userData) {
      const userObj =
        typeof userData === "string" ? JSON.parse(userData) : userData;
      setUser(userObj);
    } else {
      setUser(null);
    }
  }, [location]);

  function logout() {
    handleLogout(navigate);
    setUser(null);
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h2>المنصة التعليمية</h2>
          </Link>
        </div>

        <nav className="nav">
     
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            الرئيسية
          </Link>


         
          {user && (
            <Link
              to="/courses"
              className={location.pathname === "/courses" ? "active" : ""}
            >
              الكورسات
            </Link>
          )}


          {user && (
            <Link
              to="/instructors"
              className={location.pathname === "/instructors" ? "active" : ""}
            >
              المدرسون
            </Link>
          )}


          {user && (
            <Link
              to="/pricing"
              className={location.pathname === "/pricing" ? "active" : ""}
            >
              الأسعار
            </Link>
          )}



          {user && user.role === "student" && (
            <Link
              to="/my-courses"
              className={location.pathname === "/my-courses" ? "active" : ""}
            >
              كورساتي
            </Link>
          )}
           

          {user ? (
            <>
              <span className="user-name">مرحباً، {user.name}</span>

              {/* لوحة التحكم - للأدمن فقط */}
              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  لوحة التحكم
                </Link>
              )}

              <button onClick={logout} className="logout-btn">
                تسجيل الخروج
              </button>
            </>
          ) : (
        
            <>
              <Link
                to="/login"
                className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
              >
                تسجيل الدخول
              </Link>

              <Link
                to="/register"
                className={`register-btn ${location.pathname === "/register" ? "active" : ""}`}
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
