import { useState, useEffect } from "react";
import Axios, { INSTRUCTORS, ADMIN_INSTRUCTORS } from "../../../../Api/Api";

export default function useInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstructors();
  }, []);

  function loadInstructors() {
    setLoading(true);
    Axios.get(`${INSTRUCTORS}`)
      .then((res) => {
        setInstructors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  
  async function handleSubmit(formData, editMode, currentInstructor) {
    try {
    
      const data = {
        name: formData.name,
        bio: formData.bio,
        specialization: formData.specialization,
        rating: formData.rating,
        experience_years: formData.experience_years,
        avatar: formData.avatar, 
      };

     
      if (editMode && !formData.avatar) {
        delete data.avatar;
      }

      let response;
      if (editMode) {
        response = await Axios.put(
          `${ADMIN_INSTRUCTORS}/${currentInstructor.id}`,
          data
        );
      } else {
        response = await Axios.post(`${ADMIN_INSTRUCTORS}`, data);
      }

      alert(editMode ? "تم تعديل المدرس بنجاح ✅" : "تم إضافة المدرس بنجاح ✅");
      loadInstructors();
      return true;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.table(error.response.data.errors);
        const firstError = Object.values(error.response.data.errors)[0][0];
        alert(`خطأ في البيانات: ${firstError}`);
      } else {
        alert("حدث خطأ غير متوقع في السيرفر");
      }
      return false;
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`هل أنت متأكد من حذف المدرس "${name}"؟`)) {
      return;
    }

    try {
      await Axios.delete(`${ADMIN_INSTRUCTORS}/${id}`);
      alert("تم حذف المدرس بنجاح ✅");
      loadInstructors();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في الحذف");
    }
  }

  return { instructors, loading, handleSubmit, handleDelete };
}