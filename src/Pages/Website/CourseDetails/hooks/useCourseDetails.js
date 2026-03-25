import { useState, useEffect, useCallback } from "react"; // أضفنا useCallback
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Axios, { COURSES } from "../../../../Api/Api";

export default function useCourseDetails(id) {
  const navigate = useNavigate();
  const cookie = Cookie(); 

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  
  useEffect(() => {

    const userData = cookie.get("educational-user");
    if (userData) {
      const user = typeof userData === "string" ? JSON.parse(userData) : userData;
      setUserRole(user.role);
    }

    
    Axios.get(`${COURSES}/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("الكورس غير موجود");
        setLoading(false);
      });
  
  }, [id]); 

  
  const checkEnrollment = useCallback(async () => {
    try {
      const token = cookie.get("educational-token");
      if (!token) return;

      const res = await Axios.get(`courses/${id}/check-enrollment`);
      setEnrolled(res.data.enrolled);
    } catch (err) {
      console.error(err);
    }
  }, [id, cookie]); 

  useEffect(() => {
    if (course) {
      checkEnrollment();
    }
  }, [course, checkEnrollment]); 


  async function handleEnrollment() {

    const token = cookie.get("educational-token");
    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
      navigate("/login");
      return;
    }

    setEnrollLoading(true);

    try {
      if (enrolled) {
        await Axios.delete(`/courses/${id}/unenroll`);
        setEnrolled(false);
        alert("تم إلغاء التسجيل");
      } else {
        await Axios.post(`/courses/${id}/enroll`);
        setEnrolled(true);
        alert("تم التسجيل بنجاح! 🎉");
      }
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ");
    } finally {
      setEnrollLoading(false);
    }
  }

  return {
    course,
    loading,
    error,
    enrolled,
    enrollLoading,
    userRole,
    handleEnrollment,
  };
}