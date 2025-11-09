import { useState, useEffect } from "react";
import axios from "axios";
import HomePageHeaderComponent from "../components/HomePageHeaderComponent";
import RoadMapCardComponent from "../components/RoadMapCardComponent";
import NewRoadMapModalComponent from "../components/NewRoadMapModalComponent";
import HomePageDots from "../react_bits/HomePageDots";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/roadmaps");

        const formattedRoadmaps = response.data.map((roadmap, index) => ({
          title: roadmap.title,
          year: "Year 1",
          concentration: "Backend Development",
          timeline: "2 Years Timeline",
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

    fetchRoadmaps();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center py-12 bg-white">
      {/* Beams Background */}
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
          dotSize={5}
          gap={15}
          baseColor="black"
          activeColor="#900"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        {/* Header spans full width */}
        <HomePageHeaderComponent />

        {/* Container for button + cards - constrained width */}
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "40px",
          }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "capitalize",
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

          {/* Loading State */}
          {loading && (
            <div style={{ fontSize: "16px", color: "#666" }}>
              Loading roadmaps...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ fontSize: "16px", color: "#900" }}>{error}</div>
          )}

          {/* Roadmap Cards Grid */}
          {!loading && !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "28px",
                width: "100%",
                justifyItems: "start",
              }}
            >
              {roadmaps.map((roadmap, index) => (
                <RoadMapCardComponent
                  key={roadmap._id || index}
                  title={roadmap.title}
                  year={roadmap.year}
                  concentration={roadmap.concentration}
                  timeline={roadmap.timeline}
                  onClick={() => console.log(`Clicked on ${roadmap.title}`)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && roadmaps.length === 0 && (
            <div style={{ fontSize: "16px", color: "#666" }}>
              No roadmaps yet. Create your first one!
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <NewRoadMapModalComponent onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
