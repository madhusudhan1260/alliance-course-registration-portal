import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";

const API_URL = "http://localhost:5000/courses";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // GET request: fetch the list of courses from JSON Server
  const loadCourses = () => {
    setLoading(true);
    setError("");

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch(() => setError("Unable to load courses. Please try again."))
      .finally(() => setLoading(false));
  };

  // Run once when the page opens
  useEffect(() => {
    loadCourses();
  }, []);

  // Go to /register and send the chosen course name as navigation state
  const handleRegister = (course) => {
    navigate("/register", { state: { course: course.name } });
  };

  return (
    <section>
      <h2 className="page-title">Available Courses</h2>

      {loading && <p className="loading">Loading courses...</p>}

      {error && (
        <div className="api-error">
          <p>{error}</p>
          <button className="btn" onClick={loadCourses}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onRegister={handleRegister} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Courses;
