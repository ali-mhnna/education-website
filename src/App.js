import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

// Pages
import Home from "./Pages/Website/Home";
import Courses from "./Pages/Website/Courses";
import CourseDetails from "./Pages/Website/CourseDetails/CourseDetails";
import Pricing from "./Pages/Website/Pricing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import NotFound from "./Pages/NotFound";

import "./index.css";
import Instructors from "./Pages/Website/Instructors";
import InstructorDetails from "./Pages/Website/InstructorDetails";
import InstructorsDashboard from "./Pages/Dashboard/Instructors/InstructorsDashboard";
import UserManagement from "./Pages/Dashboard/Users/UserManagement";
import MyCourses from "./Pages/Website/MyCourses";
import EnrollmentManagement from "./Pages/Dashboard/Enrollments/EnrollmentManagement";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* صفحات عامة (بدون حماية) */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* صفحات محمية (لازم تسجيل دخول) */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute>
                  <CourseDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />

            {/* صفحة الأدمن فقط */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instructors"
              element={
                <ProtectedRoute>
                  <Instructors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instructors/:id"
              element={
                <ProtectedRoute>
                  <InstructorDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/instructors"
              element={
                <ProtectedRoute adminOnly={true}>
                  <InstructorsDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/enrollments"
              element={
                <ProtectedRoute adminOnly={true}>
                  <EnrollmentManagement />
                </ProtectedRoute>
              }
            />

            {/* صفحة 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
