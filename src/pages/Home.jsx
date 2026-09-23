import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>Alliance University Course Registration Portal</h1>
      <p>
        An easy and secure platform for students to explore available courses
        and complete their course registration.
      </p>

      <div className="hero-buttons">
        <button className="btn" onClick={() => navigate("/courses")}>
          View Courses
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/register")}>
          Register Now
        </button>
      </div>
    </section>
  );
}

export default Home;
