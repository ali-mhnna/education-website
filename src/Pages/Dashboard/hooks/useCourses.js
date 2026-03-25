import { useState, useEffect } from "react";
import Axios, { COURSES, ADMIN_COURSES, INSTRUCTORS } from "../../../Api/Api";
export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
    loadInstructors();
  }, []);

  
  function loadCourses() {
    setLoading(true);
    Axios.get(`${COURSES}`) 
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  
  function loadInstructors() {
    Axios.get(`${INSTRUCTORS}`) 
      .then((res) => {
        setInstructors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
         
 
  async function handleDelete(id, title) {
    if (!window.confirm(`هل أنت متأكد من حذف الكورس "${title}"؟`)) {
      return;
    }

    try {
      await Axios.delete(`${ADMIN_COURSES}/${id}`); 
      alert("تم حذف الكورس بنجاح ✅");
      loadCourses();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في الحذف");
    }
  }
       
 
  async function handleSubmit(formData, editMode, currentCourse) {
    try {
      const dataToSend = {
        ...formData,
        instructor_id: parseInt(formData.instructor_id),
        is_featured: formData.is_featured ? true : false,
      };

      if (editMode) {
        
        await Axios.put(`${ADMIN_COURSES}/${currentCourse.id}`, dataToSend); 
      } else {
       
        await Axios.post(`${ADMIN_COURSES}`, dataToSend); 
        alert("تم إضافة الكورس بنجاح ✅");
      }
      return true;
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "حدث خطأ أثناء حفظ البيانات");
      return false;
    }
  }

  return {
    courses,
    instructors,
    loading,
    handleDelete,
    handleSubmit,
    loadCourses
  };
}