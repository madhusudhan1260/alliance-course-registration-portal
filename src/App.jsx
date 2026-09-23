import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import Register from "./pages/Register.jsx";
import Success from "./pages/Success.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Navbar is outside <Routes>, so it shows on every page */}
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          {/* key makes the form reset each time the user navigates to /register */}
          <Route path="/register" element={<Register key={location.key} />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      <footer className="footer">
        © 2026 Alliance University Course Registration Portal
      </footer>
    </>
  );
}

export default App;
