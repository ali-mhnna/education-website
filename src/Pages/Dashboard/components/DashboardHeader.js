import React from "react";

export default function DashboardHeader({ onAddClick }) {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-text">
          <h1>لوحة تحكم الأدمن 👑</h1>
          <p>إدارة الكورسات والمدرسين</p>
        </div>
        <button onClick={onAddClick} className="add-btn">
          ➕ إضافة كورس جديد
        </button>
      </div>
    </div>
  );
}