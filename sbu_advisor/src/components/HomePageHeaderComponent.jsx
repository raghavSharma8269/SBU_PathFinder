import sbuLogo from "../assets/SBU_Logo_Clear.png";

const HomePageHeaderComponent = () => {
  return (
    <header
      className="w-full flex items-center justify-center gap-4 bg-[#900]"
      style={{ padding: "20px" }}
    >
      <img
        src={sbuLogo}
        alt="PathFinder Logo"
        style={{ width: "80px", height: "80px" }}
      />
      <h1 className="text-4xl font-bold text-white tracking-wide">
        PathFinder
      </h1>
    </header>
  );
};

export default HomePageHeaderComponent;
