import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../components/InputField.jsx";

const COURSES_URL = "http://localhost:5000/courses";
const REGISTER_URL = "http://localhost:5000/registrations";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Course sent from the Courses page (if the user clicked Register on a card)
  const selectedCourse = location.state?.course || "";

  // Controlled form state: every input reads from and writes to this object
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    rollNumber: "",
    phone: "",
    course: selectedCourse,
  });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseError, setCourseError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // GET the courses to fill the dropdown
  const loadCourses = () => {
    setCourseError("");
    fetch(COURSES_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch(() => setCourseError("Unable to load courses. Please try again."));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // One change handler for all fields, using the input's "name"
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Returns an object of error messages (empty object means the form is valid)
  const validate = () => {
    const newErrors = {};

    if (formData.studentName.trim().length < 3) {
      newErrors.studentName = "Name must contain at least 3 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.rollNumber.trim() === "") {
      newErrors.rollNumber = "Roll number is required.";
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }
    if (formData.course === "") {
      newErrors.course = "Please select a course.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from reloading the page
    setSubmitError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    // Stop here if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    // POST request: save the registration in JSON Server
    fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then(() => {
        // Pass the submitted data to the Success page
        navigate("/success", { state: formData });
      })
      .catch(() => {
        setSubmitError("Registration failed. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="form-wrapper">
      <h2 className="page-title">Course Registration Form</h2>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <InputField
          label="Student Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          error={errors.studentName}
          placeholder="Enter your full name"
        />

        <InputField
          label="Student Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <InputField
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          error={errors.rollNumber}
          placeholder="e.g. 23CSE101"
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="10-digit mobile number"
        />

        <div className="form-group">
          <label htmlFor="course">Course Selection</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={errors.course ? "input-error" : ""}
          >
            <option value="">-- Select a course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
          {errors.course && <p className="error">{errors.course}</p>}
          {courseError && (
            <p className="error">
              {courseError}{" "}
              <button type="button" className="link-btn" onClick={loadCourses}>
                Retry
              </button>
            </p>
          )}
        </div>

        {submitError && <div className="api-error">{submitError}</div>}

        <button type="submit" className="btn btn-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </section>
  );
}

export default Register;
