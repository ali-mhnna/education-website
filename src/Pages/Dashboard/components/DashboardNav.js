import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardNav() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-nav">
      <button onClick={() => navigate("/dashboard")} className="nav-btn active">
        📚 إدارة الكورسات
      </button>
      <button
        onClick={() => navigate("/dashboard/instructors")}
        className="nav-btn"
      >
        👨‍🏫 إدارة المدرسين
      </button>
      <button onClick={() => navigate("/dashboard/users")} className="nav-btn">
        👥 إدارة المستخدمين
      </button>
      <button
        onClick={() => navigate("/dashboard/enrollments")}
        className="nav-btn"
      >
        📋 الكورسات المسجلة
      </button>
    </div>
  );
}
