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
      <div className="w-full flex justify-start">
        <button
          className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          style={{
            padding: "20px",
            marginBottom: "30px",
            marginLeft: "70px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          + Create New Roadmap
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <RoadMapCardComponent />
        <RoadMapCardComponent />
        <RoadMapCardComponent />
        <RoadMapCardComponent />
        <RoadMapCardComponent />
      </div>
      {isModalOpen && (
        <NewRoadMapModalComponent onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
