import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import "../../../Styles/InstructorsDashboard.css";


// Custom Hook
import useInstructors from "./hooks/useInstructors";

// Components
import InstructorHeader from "./components/InstructorHeader";
import DashboardNav from "../components/DashboardNav";
import InstructorStatsCards from "./components/InstructorStatsCards";
import InstructorsTable from "./components/InstructorsTable";
import InstructorModal from "./components/InstructorModal";

export default function InstructorsDashboard() {
  const navigate = useNavigate();
  const cookie = Cookie();
  const { instructors, loading, handleSubmit, handleDelete } = useInstructors();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);

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

  // openAddModal
  function openAddModal() {
    setEditMode(false);
    setCurrentInstructor(null);
    setShowModal(true);
  }

  // openEditModal
  function openEditModal(instructor) {
    setEditMode(true);
    setCurrentInstructor(instructor);
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
    <div className="instructors-dashboard-page">
      <InstructorHeader onAddClick={openAddModal} />

      <div className="dashboard-content">
        <div className="container">
          <DashboardNav />
          <InstructorStatsCards instructors={instructors} />
          <InstructorsTable
            instructors={instructors}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <InstructorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editMode={editMode}
        currentInstructor={currentInstructor}
      />
    </div>
  );
}