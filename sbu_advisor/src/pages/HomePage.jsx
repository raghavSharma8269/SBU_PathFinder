import { useState, useEffect } from "react";
import axios from "axios";
import HomePageHeaderComponent from "../components/HomePageHeaderComponent";
import RoadMapCardComponent from "../components/RoadMapCardComponent";
import NewRoadMapModalComponent from "../components/NewRoadMapModalComponent";
import HomePageDots from "../react_bits/HomePageDots";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch all roadmaps
  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/roadmaps");

      const formattedRoadmaps = response.data.map((roadmap) => ({
        title: roadmap.title,
        skills:
          roadmap.formData?.skills ||
          roadmap.form?.skills ||
          "No skills listed",
        _id: roadmap._id,
      }));

      setRoadmaps(formattedRoadmaps);
      setError(null);
    } catch (err) {
      console.error("Error fetching roadmaps:", err);
      setError("Failed to load roadmaps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmapById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/roadmaps/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      navigate("/portal", { state: { roadmap: data } });
      return data;
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      return null;
    }
  };

  const handleRoadmapCreated = (newRoadmap) => {
    console.log("New roadmap created:", newRoadmap);
    if (newRoadmap && newRoadmap._id) {
      navigate("/portal", { state: { roadmap: newRoadmap } });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center py-12 bg-white overflow-x-hidden">
      {/* Background Dots */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1000px",
          zIndex: 0,
        }}
      >
        <HomePageDots
          dotSize={3}
          gap={15}
          baseColor="#383636"
          activeColor="#900"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <HomePageHeaderComponent />

        {/* Main Container */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          {/* Create Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "14px 24px",
              fontSize: "16px",
              fontWeight: 500,
              color: "#fff",
              background: "black",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              marginBottom: "32px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
            }}
          >
            + Create New Roadmap
          </button>

          {/* Loading */}
          {loading && (
            <div style={{ fontSize: "16px", color: "#666" }}>
              Loading roadmaps...
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ fontSize: "16px", color: "#900" }}>{error}</div>
          )}

          {/* Roadmap Cards Grid */}
          {!loading && !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
                justifyItems: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {roadmaps.map((roadmap, index) => (
                <RoadMapCardComponent
                  key={index}
                  id={roadmap._id}
                  title={roadmap.title}
                  skills={roadmap.skills}
                  fetchRoadmapById={fetchRoadmapById}
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && roadmaps.length === 0 && (
            <div style={{ fontSize: "16px", color: "#666" }}>
              No roadmaps yet. Create your first one!
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewRoadMapModalComponent
          onClose={() => setIsModalOpen(false)}
          onRoadmapCreated={handleRoadmapCreated}
        />
      )}
    </div>
  );
};

export default HomePage;
