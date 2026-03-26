import React from "react";
import { useNavigate } from "react-router-dom";

export default function CourseInstructor({ instructor }) {
  const navigate = useNavigate();

 
  const getAvatarUrl = (avatar) => {
    return avatar || "https://via.placeholder.com/100?text=No+Image";
  };

  return (
    <div
      className="instructor-card-inline"
      onClick={() => navigate(`/instructors/${instructor.id}`)}
    >
      <div className="instructor-avatar-small">
        <img
          src={getAvatarUrl(instructor.avatar)}
          alt={instructor.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100";
          }}
        />
      </div>
      <div className="instructor-info-small">
        <p className="label">المدرب</p>
        <h4>{instructor.name}</h4>
        <p className="spec">{instructor.specialization}</p>
        <div className="instructor-rating">
          <span>⭐ {instructor.rating}</span>
          <span>• {instructor.experience_years} سنوات خبرة</span>
        </div>
      </div>
    </div>
  );
}