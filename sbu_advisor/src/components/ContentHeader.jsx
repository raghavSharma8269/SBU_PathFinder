// Imports: Dependencies
import { useNavigate } from "react-router-dom";
import ShinyText from "../react_bits/ShinyText/ShinyText";

// Imports: CSS
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ContentHeader.css";

// Imports: Assets
import sbuLogoClear from "../assets/SBU_Logo_Clear.png";

export default function ContentHeader({
  onNewSemester,
  onSaveRoadmap,
  showAccent = true,
  track = "SWE Track",
  focus = "Full-Stack Development",
  title,
}) {
  const navigate = useNavigate();

  return (
    <header className={`content-header ${showAccent ? "with-accent" : ""}`}>
      <div className="content-header-left">
        {/* Back Button */}
        <button
          className="icon-button back-button"
          aria-label="Back to home"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-arrow-left" />
        </button>

        {/* SBU Logo, Title/Descriptions */}
        <div className="brand">
          <div className="SBU-icon" aria-hidden="true">
            <img src={sbuLogoClear} alt="Stony Brook University" />
          </div>

          <div className="titles">
            <ShinyText
              text={title}
              disabled={false}
              speed={3}
              className="title"
            />
            <div className="subtitle">
              <span>{track}</span>
              <span className="dot" aria-hidden="true">
                •
              </span>
              <span>{focus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-header-right">
        <div className="actions-group">
          {/*
          <button
              type="button"
              className="btn btn-ghost"
              onClick={onNewSemester}
          >
            <i className="bi bi-plus-lg" />
            <span>New Roadmap</span>
          </button>
          */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSaveRoadmap}
          >
            <i className="bi bi-save" />
            <span>Save Roadmap</span>
          </button>
        </div>
      </div>
    </header>
  );
}
