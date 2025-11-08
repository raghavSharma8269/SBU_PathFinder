import "./App.css";
import PlannerPage from "./pages/PlannerPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portal" element={<PlannerPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
