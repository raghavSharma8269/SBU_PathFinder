import { useState } from "react";
import HomePageHeaderComponent from "../components/HomePageHeaderComponent";
import RoadMapCardComponent from "../components/RoadMapCardComponent";
import NewRoadMapModalComponent from "../components/NewRoadMapModalComponent";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample roadmap data - you can later fetch this from an API or state management
  const roadmaps = [
    {
      title: "Backend Master",
      year: "Year 1",
      concentration: "Backend Development",
      timeline: "2 Years Timeline",
      gradientColors: {
        start: "#ff4d4d",
        middle: "#ff9900",
        end: "#ff4d4d",
      },
    },
    {
      title: "Frontend Pro",
      year: "Year 2",
      concentration: "Frontend Development",
      timeline: "1.5 Years Timeline",
      gradientColors: {
        start: "#667eea",
        middle: "#764ba2",
        end: "#667eea",
      },
    },
    {
      title: "AI/ML Journey",
      year: "Year 3",
      concentration: "Machine Learning",
      timeline: "3 Years Timeline",
      gradientColors: {
        start: "#f093fb",
        middle: "#f5576c",
        end: "#f093fb",
      },
    },
    {
      title: "Game Dev Path",
      year: "Year 2",
      concentration: "Game Development",
      timeline: "2.5 Years Timeline",
      gradientColors: {
        start: "#4facfe",
        middle: "#00f2fe",
        end: "#4facfe",
      },
    },
    {
      title: "Full Stack",
      year: "Year 4",
      concentration: "Full Stack Developer",
      timeline: "4 Years Timeline",
      gradientColors: {
        start: "#43e97b",
        middle: "#38f9d7",
        end: "#43e97b",
      },
    },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center py-12"
      style={{
        background:
          "linear-gradient(214deg, rgba(153, 0, 0, 1) 18%, rgba(0, 0, 0, 1) 98%, rgba(0, 0, 0, 1) 81%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <HomePageHeaderComponent />

      {/* Container for button + cards aligned to left */}
      <div className="w-full max-w-[1400px] flex flex-col items-start px-12">
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
            marginBottom: "24px",
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

        <div className="grid grid-cols-4 gap-8 mt-8 w-full">
          {roadmaps.map((roadmap, index) => (
            <RoadMapCardComponent
              key={index}
              title={roadmap.title}
              year={roadmap.year}
              concentration={roadmap.concentration}
              timeline={roadmap.timeline}
              gradientColors={roadmap.gradientColors}
              onClick={() => console.log(`Clicked on ${roadmap.title}`)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <NewRoadMapModalComponent onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
