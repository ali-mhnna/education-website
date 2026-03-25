import React from "react";

export default function UserStatsCards({ users }) {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h3>إجمالي المستخدمين</h3>
        <p className="stat-number">{users.length}</p>
      </div>
      <div className="stat-card">
        <h3>المدراء</h3>
        <p className="stat-number">
          {users.filter((u) => u.role === "admin").length}
        </p>
      </div>
      <div className="stat-card">
        <h3>الطلاب</h3>
        <p className="stat-number">
          {users.filter((u) => u.role === "student").length}
        </p>
      </div>
      <div className="stat-card">
        <h3>المدرسين</h3>
        <p className="stat-number">
          {users.filter((u) => u.role === "instructor").length}
        </p>
      </div>
    </div>
  );
}