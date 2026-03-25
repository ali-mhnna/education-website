import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import "../../../Styles/Dashboard.css";

// Custom Hook
import useEnrollments from "./hooks/useEnrollments";


// Components
import EnrollmentHeader from "./components/EnrollmentHeader";
import DashboardNav from "../components/DashboardNav";
import EnrollmentStatsCards from "./components/EnrollmentStatsCards";
import EnrollmentTable from "./components/EnrollmentTable";
import StudentsModal from "./components/StudentsModal";


export default function EnrollmentManagement() {
  const navigate = useNavigate();
  const cookie = Cookie();

  const { 
    courses, 
    loading, 
    students, 
    studentsLoading, 
    loadStudents, 
    clearStudents 
  } = useEnrollments();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // التحقق من الأدمن
  useEffect(() => {
    const user = cookie.get("educational-user");
    if (!user) {
      navigate("/login");
      return;
    }

    const userData = typeof user === "string" ? JSON.parse(user) : user;
    if (userData.role !== "admin") {
      alert("غير مصرح لك بالوصول لهذه الصفحة");
      navigate("/");
    }
  }, []);

  function viewStudents(course) {
    setSelectedCourse(course);
    setShowModal(true);
    loadStudents(course.id);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedCourse(null);
    clearStudents();
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
      <EnrollmentHeader />

      <div className="dashboard-content">
        <div className="container">
          <DashboardNav />
          <EnrollmentStatsCards courses={courses} />
          <EnrollmentTable courses={courses} onViewStudents={viewStudents} />
        </div>
      </div>

      <StudentsModal
        show={showModal}
        onClose={closeModal}
        course={selectedCourse}
        students={students}
        loading={studentsLoading}
      />
    </div>
  );
}