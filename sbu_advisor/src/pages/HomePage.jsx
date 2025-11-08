import { useState } from "react";
import HomePageHeaderComponent from "../components/HomePageHeaderComponent";
import RoadMapCardComponent from "../components/RoadMapCardComponent";
import NewRoadMapModalComponent from "../components/NewRoadMapModalComponent";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <RoadMapCardComponent />
          <RoadMapCardComponent />
          <RoadMapCardComponent />
          <RoadMapCardComponent />
          <RoadMapCardComponent />
        </div>
      </div>

      {isModalOpen && (
        <NewRoadMapModalComponent onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
