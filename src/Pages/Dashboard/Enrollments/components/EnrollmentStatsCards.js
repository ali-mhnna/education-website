import React from "react";

export default function EnrollmentStatsCards({ courses }) {
  const totalStudents = courses.reduce((sum, c) => sum + (c.users_count || 0), 0);
  const coursesWithStudents = courses.filter((c) => c.users_count > 0).length;

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h3>إجمالي التسجيلات</h3>
        <p className="stat-number">{totalStudents}</p>
      </div>
      <div className="stat-card">
        <h3>كورسات فيها طلاب</h3>
        <p className="stat-number">{coursesWithStudents}</p>
      </div>
      <div className="stat-card">
        <h3>كورسات بدون طلاب</h3>
        <p className="stat-number">{courses.length - coursesWithStudents}</p>
      </div>
    </div>
  );
}