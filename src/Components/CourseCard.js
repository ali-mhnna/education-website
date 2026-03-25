import React from 'react';
import { useNavigate } from 'react-router-dom';  
import '../Styles/CourseCard.css';

export default function CourseCard({ data }) {
  const navigate = useNavigate();  
  const serverBaseUrl = process.env.REACT_APP_API_URL 
    ? process.env.REACT_APP_API_URL.replace('/api', '') 
    : 'http://127.0.0.1:8000';

  const imageUrl = data.image.startsWith('http') 
    ? data.image 
    : `${serverBaseUrl}${data.image}`;

  function viewDetails() {
    navigate(`/courses/${data.id}`);
  }

  return (
    <div className="course-card">
      <div className="course-image">

        <img src={imageUrl} alt={data.title} />
        <span className="course-price">${data.price}</span>
      </div>
      
      <div className="course-content">
        <h3 className="course-title">{data.title}</h3>
        <p className="course-description">{data.description}</p>
        
        <div className="course-footer">
          <div className="course-rating">
            <span>⭐</span>
            <span>{data.rating}</span>
          </div>
          
          {data.instructor_name && (
            <div className="course-instructor">
              <span>👨‍🏫 {data.instructor_name}</span>
            </div>
          )}
        </div>
        
        <button onClick={viewDetails} className="course-btn">  
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}