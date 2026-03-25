import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import "../../../Styles/Dashboard.css";

// Custom Hook
import useUsers from "./hooks/useUsers";

// Components
import UserHeader from "./components/UserHeader";
import DashboardNav from "../components/DashboardNav";
import UserStatsCards from "./components/UserStatsCards";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";

export default function UserManagement() {
  const navigate = useNavigate();
  const cookie = Cookie();
  const [currentUserId, setCurrentUserId] = useState(null);
  const { users, loading, handleDelete, handleSubmit } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    setCurrentUserId(userData.id);

    if (userData.role !== "admin") {
      alert("غير مصرح لك بالوصول لهذه الصفحة");
      navigate("/");
    }
  }, []);

  // openAddModal
  function openAddModal() {
    setEditMode(false);
    setCurrentUser(null);
    setShowModal(true);
  }

  // openEditModal
  function openEditModal(user) {
    setEditMode(true);
    setCurrentUser(user);
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
      <UserHeader onAddClick={openAddModal} />

      <div className="dashboard-content">
        <div className="container">
          <DashboardNav />
          <UserStatsCards users={users} />
          <UsersTable
            users={users}
            onEdit={openEditModal}
            onDelete={handleDelete}
            currentUserId={currentUserId}
          />
        </div>
      </div>

      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editMode={editMode}
        currentUser={currentUser}
      />
    </div>
  );
}
