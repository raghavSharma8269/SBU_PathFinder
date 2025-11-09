import { useState } from "react";
import HomePageHeaderComponent from "../components/HomePageHeaderComponent";
import RoadMapCardComponent from "../components/RoadMapCardComponent";
import NewRoadMapModalComponent from "../components/NewRoadMapModalComponent";
import Beams from "../react_bits/HomePageDots";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample roadmap data
  const roadmaps = [
    {
      id: "69101566769a2e1c9c2c51d3",
      title: "Backend Master",
      year: "Year 1",
      concentration: "Backend Development",
      timeline: "2 Years Timeline",
    },
    {
      id: "691012924b9923b8d8154482",
      title: "Frontend Pro",
      year: "Year 2",
      concentration: "Frontend Development",
      timeline: "1.5 Years Timeline",
    },
    {
      id: "691012924b9923b8d8154483",
      title: "AI/ML Journey",
      year: "Year 3",
      concentration: "Machine Learning",
      timeline: "3 Years Timeline",
    },
    {
      id: "691012924b9923b8d8154484",
      title: "Game Dev Path",
      year: "Year 2",
      concentration: "Game Development",
      timeline: "2.5 Years Timeline",
    },
    {
      id: "69101566769a2e1c9c2c51d7",
      title: "Full Stack",
      year: "Year 4",
      concentration: "Full Stack Developer",
      timeline: "4 Years Timeline",
    },
  ];

  const fetchRoadmapById = async (id) => {
    console.log("Fetching roadmap with ID:", id);
    try {
      const response = await fetch(`http://localhost:5001/api/roadmaps/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      return null;
    }
  };

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
        <Beams
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

          {/* Roadmap Cards Grid */}
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
                key={index}
                id={roadmap.id}
                title={roadmap.title}
                year={roadmap.year}
                concentration={roadmap.concentration}
                timeline={roadmap.timeline}
                fetchRoadmapById={fetchRoadmapById}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <NewRoadMapModalComponent onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
