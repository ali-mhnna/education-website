import React from "react";

export default function StatsCards({ courses }) {
  const avgPrice = courses.length > 0
    ? (courses.reduce((sum, c) => sum + parseFloat(c.price), 0) / courses.length).toFixed(2)
    : 0;

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h3>إجمالي الكورسات</h3>
        <p className="stat-number">{courses.length}</p>
      </div>
      <div className="stat-card">
        <h3>الكورسات المميزة</h3>
        <p className="stat-number">
          {courses.filter((c) => c.is_featured).length}
        </p>
      </div>
      <div className="stat-card">
        <h3>متوسط السعر</h3>
        <p className="stat-number">${avgPrice}</p>
      </div>
    </div>
  );
}