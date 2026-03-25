import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios, { INSTRUCTORS } from "../../Api/Api";
import "../../Styles/Instructors.css";
const fallbackImage =

  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='45%25' font-size='60' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3E%F0%9F%91%A4%3C/text%3E%3Ctext x='50%25' y='65%25' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3ENo Image%3C/text%3E%3C/svg%3E";
const serverBaseUrl = "http://127.0.0.1:8000";

export default function Instructors() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(`/${INSTRUCTORS}`)
      .then((res) => {
        console.log("Instructors:", res.data);
        setInstructors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("حدث خطأ في تحميل المدرسين");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري تحميل المدرسين...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="instructors-page">
      <section className="instructors-header">
        <div className="container">
          <h1>المدرسون</h1>
          <p>تعرّف على نخبة من أفضل المدرسين في مختلف المجالات</p>
        </div>
      </section>

      <section className="instructors-section">
        <div className="container">
          <div className="instructors-grid">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="instructor-card"
                onClick={() => navigate(`/instructors/${instructor.id}`)}
              >
                <div className="instructor-avatar">
                  <img
                    src={
                      instructor.avatar
                        ? instructor.avatar.startsWith("http")
                          ? instructor.avatar
                          : `${serverBaseUrl}/storage/${instructor.avatar}`
                        : fallbackImage
                    }
                    alt={instructor.name}
                  />
                </div>

                <div className="instructor-info">
                  <h3 className="instructor-name">{instructor.name}</h3>
                  <p className="instructor-specialization">
                    📚 {instructor.specialization}
                  </p>

                  <div className="instructor-meta">
                    <div className="meta-item">
                      <span className="icon">⭐</span>
                      <span>{instructor.rating}</span>
                    </div>
                    <div className="meta-item">
                      <span className="icon">💼</span>
                      <span>{instructor.experience_years} سنوات</span>
                    </div>
                  </div>

                  <div className="instructor-courses-count">
                    <span className="count">{instructor.courses_count}</span>
                    <span className="label">كورس</span>
                  </div>

                  <button className="view-profile-btn">عرض الملف الشخصي</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
