import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Axios, { MY_COURSES } from "../../Api/Api";
import CourseCard from "../../Components/CourseCard";
import "../../Styles/Courses.css";

export default function MyCourses() {
    const navigate = useNavigate();
    const cookie = Cookie();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = cookie.get('educational-token');
        if (!token) {
            navigate('/login');
            return;
        }

        loadMyCourses();
    }, []);

    // loadMyCourses
    function loadMyCourses() {
        setLoading(true);
        Axios.get(`${MY_COURSES}`)
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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
        <div className="courses-page">
            <div className="courses-header">
                <div className="container">
                    <h1>كورساتي 📚</h1>
                    <p>الكورسات التي سجلت بها</p>
                </div>
            </div>

            <div className="courses-content">
                <div className="container">
                    {courses.length === 0 ? (
                        <div className="empty-state">
                            <h2>لم تسجل بأي كورس بعد</h2>
                            <button onClick={() => navigate('/courses')} className="browse-btn">
                                تصفح الكورسات
                            </button>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {courses.map((course) => (
                                <CourseCard key={course.id} data={course} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}