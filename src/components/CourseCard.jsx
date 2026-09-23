// CourseCard receives data from its parent (Courses page) through props
function CourseCard({ course, onRegister }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>
        <strong>Course Code:</strong> {course.code}
      </p>
      <p>
        <strong>Credits:</strong> {course.credits}
      </p>
      <button className="btn" onClick={() => onRegister(course)}>
        Register
      </button>
    </div>
  );
}

export default CourseCard;
