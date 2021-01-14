import React, { useState } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import { Emojione } from "react-emoji-render";
const Paper = () => {
  const [hoveredMug, setHoveredMug] = useState(false);
  const [heartOne, showHeartOne] = useState(false);
  const [heartTwo, showHeartTwo] = useState(false);
  const [heartThree, showHeartThree] = useState(false);
  const triggerHearts = () => {
    setTimeout(() => {
      showHeartOne(true);
    }, 450);
    setTimeout(() => {
      showHeartTwo(true);
    }, 100);
    setTimeout(() => {
      showHeartThree(true);
    }, 300);
    setTimeout(() => {
      showHeartOne(false);
      showHeartTwo(false);
      showHeartThree(false);
    }, 1000);
  };
  const triggered = (bool) => {
    setHoveredMug(bool);
    if (bool) {
      triggerHearts(true);
    }
  };
  return (
    <section className="text-center text-secondary flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
      <div className="relative w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl  font-bold">
          For The People Who Prefer Paper
        </h1>

        <Link to="/cv">
          <button className="btn max-w-md w-8/12 py-3 px-5">View CV</button>
        </Link>
        <div className="flex -mx-20 md:-mt-32 justify-between">
          <div className="hidden md:block -mt-12 md:-ml-6 lg:-ml-12 float-y">
            <StaticImage
              src="https://ik.imagekit.io/sld/SuperScene/lamp_b_QOy7Wo8mbMub.png"
              alt="Lantern"
              className="w-36"
            />
          </div>
          <div
            className="hidden md:block mt-24 relative cursor-pointer outline-none"
            onMouseOver={() => triggered(true)}
            onMouseLeave={() => triggered(false)}
            onClick={() => triggerHearts()}
          >
            <div
              className={`block w-24 h-full outline-none float-y-reverse`}
            >
              <StaticImage
                src="https://ik.imagekit.io/sld/SuperScene/cup_1_wll_9vjmfeIQ.png"
                alt="Lantern"
                className={`${
                  hoveredMug ? "rotate-180-cw " : "rotate-0-cw"
                }`}
              />
            </div>
            {hoveredMug && (
              <>
                {[heartOne, heartTwo, heartThree].map((heart, i) => (
                  <div
                    key={"heart" + i}
                    style={{ position: "absolute", top: 68, left: 10 }}
                    className={`text-4xl ${
                      heart ? "roll-out-bottom" : "hidden"
                    }`}
                  >
                    <Emojione text="❤️" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Paper.propTypes = {
  paperclip: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  mug: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Paper;
