# Alliance University Course Registration Portal

A simple React.js lab project: students browse courses, pick one, fill a validated registration form, and submit it to a mock REST API.

**Flow:** Home → Courses → Select Course → Registration Form → Validation → API Submission → Success Page

## Tech Stack
React (Vite) · JavaScript/JSX · React Router · Fetch API · JSON Server · plain CSS

## Run Locally
```bash
npm install
npm run server   # JSON Server mock API → http://localhost:5000
npm run dev      # React app → http://localhost:5173
```
Keep both commands running in separate terminals.

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/courses` | List available courses |
| POST | `/registrations` | Save a student registration |

## Project Structure
```
src/
├── components/   Navbar, CourseCard, InputField
├── pages/        Home, Courses, Register, Success
├── App.jsx       Routes
├── main.jsx      Entry point (BrowserRouter)
└── index.css     Styles
db.json           Mock database
```

## React Concepts Demonstrated
Components · Props · useState · Controlled Components · Event Handling · Conditional Rendering · React Router · Form Validation · API Integration · CSS
