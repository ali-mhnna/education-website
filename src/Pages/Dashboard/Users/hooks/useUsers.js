import { useState, useEffect } from "react";
import Axios, { ADMIN_USERS } from "../../../../Api/Api";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    setLoading(true);
   
    Axios.get(`${ADMIN_USERS}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب المستخدمين:", err);
        setLoading(false);
      });
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`هل أنت متأكد من حذف المستخدم "${name}"؟`)) {
      return;
    }

    try {
      await Axios.delete(`${ADMIN_USERS}/${id}`);
      alert("تم حذف المستخدم بنجاح ✅");
      loadUsers();
    } catch (error) {
      console.error("Delete Error:", error);
      
      const msg = error.response?.data?.message || "حدث خطأ أثناء الحذف";
      alert(msg);
    }
  }

  async function handleSubmit(formData, editMode, currentUser) {
    try {
   
      const dataToSend = { ...formData };

     
      if (editMode && (!dataToSend.password || dataToSend.password.trim() === "")) {
        delete dataToSend.password;
      }

      if (editMode) {
        await Axios.put(`${ADMIN_USERS}/${currentUser.id}`, dataToSend);
        alert("تم تعديل بيانات المستخدم بنجاح ✅");
      } else {
        await Axios.post(`${ADMIN_USERS}`, dataToSend);
        alert("تم إضافة المستخدم بنجاح ✅");
      }

      loadUsers();
      return true;
    } catch (error) {
 
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0][0]; 
        alert(`خطأ: ${firstError}`);
      } else {
        alert("حدث خطأ: " + (error.response?.data?.message || "حاول مرة أخرى"));
      }
      return false;
    }
  }

  return {
    users,
    loading,
    handleDelete,
    handleSubmit,
    loadUsers,
  };
}