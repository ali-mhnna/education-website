import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

// Components
import DashboardHeader from "./components/DashboardHeader";
import DashboardNav from "./components/DashboardNav";
import StatsCards from "./components/StatsCards";
import CoursesTable from "./components/CoursesTable";
import CourseModal from "./components/CourseModal";

// Custom Hook
import useCourses from "./hooks/useCourses";

import "../../Styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const cookie = Cookie();

  const { courses, instructors, loading, handleDelete, handleSubmit } = useCourses();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  // التحقق من الأدمن
  useEffect(() => {
    const user = cookie.get("educational-user");
    if (!user) {
      navigate("/login");
      return;
    }

    let userData;
    if (typeof user === "string") {
      userData = JSON.parse(user);
    } else {
      userData = user;
    }

    if (userData.role !== "admin") {
      alert("غير مصرح لك بالوصول لهذه الصفحة");
      navigate("/");
    }
  }, []);

  // openAddModal
  function openAddModal() {
    setEditMode(false);
    setCurrentCourse(null);
    setShowModal(true);
  }

  // openEditModal
  function openEditModal(course) {
    setEditMode(true);
    setCurrentCourse(course);
    setShowModal(true);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader onAddClick={openAddModal} />

      <div className="dashboard-content">
        <div className="container">
          <DashboardNav/>
          <StatsCards courses={courses} />
          <CoursesTable
            courses={courses}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <CourseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editMode={editMode}
        currentCourse={currentCourse}
        instructors={instructors}
      />

      
    </div>
  );
}