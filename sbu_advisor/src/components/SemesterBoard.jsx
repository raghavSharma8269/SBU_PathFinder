import { useState } from "react";
import "./SemesterBoard.css";

export default function SemesterBoard({ semesters = [], onDropCourse }) {
  const [dragOverId, setDragOverId] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    let effect = "copy";
    try {
      const raw = e.dataTransfer.getData("application/x-course");
      if (raw) {
        const payload = JSON.parse(raw);
        if (payload?.source === "semester") effect = "move";
      }
    } catch {}
    e.dataTransfer.dropEffect = effect;
  };

  const handleDrop = (e, semId) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/x-course");
    if (!raw) return;
    try {
      const course = JSON.parse(raw);
      const normalized = { ...course, status: course.status || "valid" };
      onDropCourse?.(semId, normalized);
    } catch (err) {
      // Silently ignore malformed payload
    }
    setDragOverId(null);
  };

  return (
    <div className="sem-board">
      {semesters.map((sem) => (
        <div
          key={sem.id}
          className={`sem-column${dragOverId === sem.id ? " drag-over" : ""}`}
          data-sem-id={sem.id}
          onDragOver={handleDragOver}
          onDragEnter={() => setDragOverId(sem.id)}
          onDragLeave={() =>
            setDragOverId((prev) => (prev === sem.id ? null : prev))
          }
          onDrop={(e) => handleDrop(e, sem.id)}
        >
          <div className="sem-column-header">
            <h3 className="sem-title">{sem.title}</h3>
            <div className="sem-meta">
              <span
                className="badge credits"
                aria-label={`${sem.totalCredits} credits`}
              >
                {sem.totalCredits} credits
              </span>
              <span
                className={`badge status ${
                  sem.courses.some((c) => c.status === "prereq-issue")
                    ? "bad"
                    : "good"
                }`}
              >
                {sem.courses.some((c) => c.status === "prereq-issue")
                  ? "Prereq Issue"
                  : "Valid"}
              </span>
            </div>
          </div>

          <div className="sem-course-stack">
            {/* Render courses */}
            {sem.courses.map((c) => (
              <details key={c.id} className="course-card" open>
                <summary
                  className="course-summary"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "copyMove";
                    e.dataTransfer.setData(
                      "application/x-course",
                      JSON.stringify({
                        id: c.id,
                        name: c.name,
                        credits: c.credits ?? 0,
                        fromSemId: sem.id,
                        source: "semester",
                      })
                    );
                    e.dataTransfer.setData("text/plain", c.id);
                  }}
                >
                  <span className="drag-handle" aria-hidden="true">
                    ⋮⋮
                  </span>
                  <div className="course-main">
                    <div className="course-header">
                      <span className="course-code">{c.id}</span>
                      <span
                        className="course-credits"
                        aria-label={`${c.credits} credits`}
                      >
                        {c.credits} cr
                      </span>
                    </div>
                    <div className="course-name">{c.name}</div>
                  </div>
                </summary>
              </details>
            ))}

            {/* Render projects with divider */}
            {sem.projects && sem.projects.length > 0 && (
              <>
                <div className="projects-divider"></div>
                <div className="projects-section">
                  <h4 style={{ color: "black" }}>Suggested Project</h4>
                  {sem.projects.map((project, idx) => (
                    <div key={idx} className="project-card">
                      <div className="project-name">{project.name}</div>
                      {project.why && (
                        <div className="project-detail">
                          <span className="project-label">Why:</span>{" "}
                          {project.why}
                        </div>
                      )}
                      {project.url && (
                        <div className="project-detail">
                          <span className="project-label">URL:</span>{" "}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            {project.url}
                          </a>
                        </div>
                      )}
                      {project.timeEstimate && (
                        <div className="project-detail">
                          <span className="project-label">Time Estimate:</span>{" "}
                          {project.timeEstimate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
