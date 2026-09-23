import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data sent from the Register page with navigate("/success", { state })
  const data = location.state;

  // If someone opens /success directly, there is no data to show
  if (!data) {
    return (
      <section className="success-card">
        <h2>No registration found</h2>
        <p>Please fill in the registration form first.</p>
        <button className="btn" onClick={() => navigate("/register")}>
          Go to Registration
        </button>
      </section>
    );
  }

  return (
    <section className="success-card">
      <div className="success-icon">✔</div>
      <h2>Registration Successful!</h2>

      <div className="details">
        <p><strong>Student Name:</strong> {data.studentName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Roll Number:</strong> {data.rollNumber}</p>
        <p><strong>Course:</strong> {data.course}</p>
      </div>

      <div className="hero-buttons">
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/courses")}>
          View Courses
        </button>
      </div>
    </section>
  );
}

export default Success;
