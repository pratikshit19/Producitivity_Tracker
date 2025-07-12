import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TodoPage from "./pages/TodoPage";
import TrackerPage from "./pages/TrackerPage";
import PomodoroPage from "./pages/PomodoroPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
      </Routes>
    </Router>
  );
}
