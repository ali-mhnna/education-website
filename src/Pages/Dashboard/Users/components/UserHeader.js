import React from "react";

export default function UserHeader({ onAddClick }) {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-text">
          <h1>إدارة المستخدمين 👥</h1>
          <p>إضافة وتعديل وحذف المستخدمين</p>
        </div>
        <button onClick={onAddClick} className="add-btn">
          ➕ إضافة مستخدم جديد
        </button>
      </div>
    </div>
  );
}