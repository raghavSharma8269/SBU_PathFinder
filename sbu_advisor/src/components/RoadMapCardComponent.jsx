import { Target, Calendar, TrendingUp, Sparkles } from "lucide-react";

const RoadMapCard = () => {
  const handleClick = () => {
    console.log("Roadmap card clicked!");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        width: "320px",
        height: "180px",
        cursor: "pointer",
      }}
    >
      {/* Gradient glow effect (reduced) */}
      <div
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          background: "linear-gradient(90deg, #ff4d4d, #ff9900, #ff4d4d)",
          borderRadius: "16px",
          opacity: 0.2, // reduced from 0.4
          filter: "blur(10px)", // reduced blur
          transition: "opacity 0.5s, transform 0.5s",
        }}
      />

      {/* Main glass card */}
      <div
        style={{
          position: "relative",
          height: "100%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px) saturate(150%)",
          borderRadius: "16px",
          padding: "24px",
          overflow: "hidden",
          boxShadow: "0 15px 40px -10px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 20px 60px -15px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 15px 40px -10px rgba(0,0,0,0.2)";
        }}
      >
        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  padding: "6px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <Sparkles
                  style={{ width: "16px", height: "16px", color: "#fff" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Roadmap Title
              </h3>
            </div>
            <div
              style={{
                padding: "4px 12px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Year 2
              </span>
            </div>
          </div>

          {/* Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <Target style={{ width: "16px", height: "16px" }} />
              <p style={{ fontSize: "14px", fontWeight: 500 }}>
                Full Stack Developer
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <Calendar style={{ width: "16px", height: "16px" }} />
              <p style={{ fontSize: "14px", fontWeight: 500 }}>
                4 Years Timeline
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMapCard;
