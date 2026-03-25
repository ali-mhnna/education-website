import React from "react";

export default function InstructorStatsCards({ instructors }) {
  const avgRating =
    instructors.length > 0
      ? (
          instructors.reduce((sum, i) => sum + parseFloat(i.rating), 0) /
          instructors.length
        ).toFixed(1)
      : 0;

  const avgExperience =
    instructors.length > 0
      ? Math.round(
          instructors.reduce((sum, i) => sum + parseInt(i.experience_years), 0) /
            instructors.length
        )
      : 0;

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h3>إجمالي المدرسين</h3>
        <p className="stat-number">{instructors.length}</p>
      </div>
      <div className="stat-card">
        <h3>متوسط التقييم</h3>
        <p className="stat-number">{avgRating}</p>
      </div>
      <div className="stat-card">
        <h3>متوسط الخبرة</h3>
        <p className="stat-number">{avgExperience} سنوات</p>
      </div>
    </div>
  );
}