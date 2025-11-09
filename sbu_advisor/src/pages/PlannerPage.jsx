// Import: Navigation
import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

// Import: Components
import ContentHeader from "../components/ContentHeader";
import SideNav from "../components/SideNav";
import MainView from "../components/MainView";
import SemesterBoard from "../components/SemesterBoard";

// Import: CSS
import "./PlannerPage.css";

// Import: Predefine semesters data
import initialSemesters from "../data/avaliable_semesters.json";

export default function Portal() {
  const { state } = useLocation();
  const userName = state?.name || "Guest";

  // Lift semesters into state so drag & drop can mutate them
  const [semesters, setSemesters] = useState(() => initialSemesters);

  // Compute set of planned course IDs to hide them from the SideNav
  const plannedCourseIds = useMemo(() => {
    const ids = new Set();
    semesters.forEach((sem) => sem.courses.forEach((c) => ids.add(c.id)));
    return ids;
  }, [semesters]);

  const handleNewSemester = () => {
    // Future: show modal to create new semester
  };

  const handleSaveRoadmap = () => {
    localStorage.setItem("roadmap", JSON.stringify({ semesters }));
  };

  // Helper to recompute credits
  const computeCredits = (courses) =>
    courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);

  // Remove a course from a given semester
  const unscheduleCourse = (fromSemId, courseId) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== fromSemId) return sem;
        const newCourses = sem.courses.filter((c) => c.id !== courseId);
        return {
          ...sem,
          courses: newCourses,
          totalCredits: computeCredits(newCourses),
        };
      })
    );
  };

  // Add (or move) a course to a semester. If course.fromSemId is present and different, remove from source.
  const addCourseToSemester = (toSemId, course) => {
    const fromSemId =
      course.fromSemId && course.fromSemId !== toSemId
        ? course.fromSemId
        : null;
    setSemesters((prev) =>
      prev.map((sem) => {
        if (fromSemId && sem.id === fromSemId) {
          const newCourses = sem.courses.filter((c) => c.id !== course.id);
          return {
            ...sem,
            courses: newCourses,
            totalCredits: computeCredits(newCourses),
          };
        }
        if (sem.id === toSemId) {
          const exists = sem.courses.some((c) => c.id === course.id);
          const newCourses = exists
            ? sem.courses
            : [...sem.courses, { ...course, fromSemId: undefined }];
          return {
            ...sem,
            courses: newCourses,
            totalCredits: computeCredits(newCourses),
          };
        }
        return sem;
      })
    );
  };

  return (
    <div className="portal-page">
      <elevenlabs-convai agent-id="agent_2001k9gndv75fw5at9cwr5m29k7x"></elevenlabs-convai>
      <script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />
      <ContentHeader
        onNewSemester={handleNewSemester}
        onSaveRoadmap={handleSaveRoadmap}
        track="SWE Track"
        focus="Full-Stack Development"
      />
      <div className="portal-content">
        <SideNav
          excludeIds={plannedCourseIds}
          onUnscheduleCourse={unscheduleCourse}
        />
        <MainView>
          <SemesterBoard
            semesters={semesters}
            onDropCourse={addCourseToSemester}
          />
        </MainView>
      </div>
    </div>
  );
}
