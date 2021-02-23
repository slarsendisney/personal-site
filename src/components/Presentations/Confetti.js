import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import ConfettiAnimation from "../Animations/ConfettiAnimation";

export default ({ children }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  const restart = (e) => {
    e.preventDefault();
    setShowConfetti(false);
    setTimeout(() => {
      setShowConfetti(true);
      if (typeof document !== "undefined") {
        document.getElementById("gatsby-focus-wrapper").focus();
      }
    }, 100);
  };
  return (
    <div style={{ height: "100%" }}>
      {showConfetti && (
        <div className="absolute top-0 left-0 w-screen h-screen" style={{pointerEvents:'none'}}>
          <ConfettiAnimation />
        </div>
      )}
      <div className="w-full h-full flex flex-col items-center justify-center">
        {children}

        <button
          className="btn px-4 py-2 rounded text-base md:text-lg"
          style={{ position: "absolute", bottom: 50 }}
          onClick={restart}
        >
          More 🎉
        </button>
      </div>
    </div>
  );
};
