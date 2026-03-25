import React from "react";

export default function InstructorHeader({ onAddClick }) {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-text">
          <h1>إدارة المدرسين 👨‍🏫</h1>
          <p>إضافة وتعديل وحذف المدرسين</p>
        </div>
        <button onClick={onAddClick} className="add-btn">
          ➕ إضافة مدرس جديد
        </button>
      </div>
    </div>
  );
}