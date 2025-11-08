import React, { useState, useEffect } from "react";

const NewRoadMapModalComponent = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [targetRole, setTargetRole] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [targetTimeline, setTargetTimeline] = useState("");
  const [completedCourses, setCompletedCourses] = useState("");
  const [skills, setSkills] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [availableSemesters, setAvailableSemesters] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  const handleSave = () => {
    console.log({
      target_role: targetRole,
      current_year: currentYear,
      target_timeline: targetTimeline,
      completed_courses: completedCourses,
      skills,
      time_commitment: timeCommitment,
      additional_context: additionalContext,
    });
    handleClose();
  };

  // Common input style
  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
    marginBottom: "12px",
    backdropFilter: "blur(8px)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "vertical",
  };

  // Button style function
  const gradientButtonStyle = (gradient) => ({
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: gradient,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  });

  const handleHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <div
        style={{
          width: "500px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          padding: "25px",
          borderRadius: "16px",
          background:
            "linear-gradient(214deg, rgba(153,0,0,0.9) 20%, rgba(87, 10, 10, 0.9) 100%)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.2s ease-in-out",
          backdropFilter: "blur(20px)",
        }}
        className="modal-scroll"
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          New Roadmap
        </h2>

        {/* Inputs */}
        <label style={labelStyle}>Target Role</label>
        <input
          type="text"
          style={inputStyle}
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Backend Engineer"
        />

        <label style={labelStyle}>Current Year</label>
        <input
          type="text"
          style={inputStyle}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          placeholder="Freshman, Sophomore, Junior, Senior"
        />

        <label style={labelStyle}>Target Timeline</label>
        <input
          type="text"
          style={inputStyle}
          value={targetTimeline}
          onChange={(e) => setTargetTimeline(e.target.value)}
          placeholder="Summer 2026"
        />

        <label style={labelStyle}>Completed Courses</label>
        <input
          type="text"
          style={inputStyle}
          value={completedCourses}
          onChange={(e) => setCompletedCourses(e.target.value)}
          placeholder="CSE 114, CSE 214"
        />

        <label style={labelStyle}>Skills</label>
        <input
          type="text"
          style={inputStyle}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, Java, Git, etc."
        />

        <label style={labelStyle}>Time Commitment</label>
        <input
          type="text"
          style={inputStyle}
          value={timeCommitment}
          onChange={(e) => setTimeCommitment(e.target.value)}
          placeholder="ex. 10-15 hrs/week"
        />

        <label style={labelStyle}>Additional Context</label>
        <textarea
          style={textareaStyle}
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="Interested in cybersecurity..."
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleClose}
            style={gradientButtonStyle(
              "linear-gradient(214deg, rgba(80,80,80,1) 20%, rgba(40,40,40,1) 100%)"
            )}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              ...gradientButtonStyle("black"),
              background: "#900",
              color: "#fff",
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoadMapModalComponent;
