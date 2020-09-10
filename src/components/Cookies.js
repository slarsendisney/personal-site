import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useCookies } from "react-cookie";

const Cookies = () => {
  const [cookies, setCookie] = useCookies(["sld-cookie-policy"]);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!cookies["sld-cookie-policy"]) {
      if (anim) {
        setTimeout(() => setAnim(false), 900);
      } else {
        setTimeout(() => setAnim(true), 5000);
      }
    }
  }, [anim]);
  function onChange() {
    setCookie("sld-cookie-policy", true, { path: "/" });
  }

  if (!cookies["sld-cookie-policy"]) {
    return (
      <div
        className="fixed bottom-0 bg-primary text-primary w-full"
        style={{ zIndex: 10000 }}
      >
        <div className=" flex items-center container px-4 py-3 mx-auto">
          <p className="text-sm md:text-base m-1">
            <i className="las la-cookie-bite text-xl mr-1 hidden md:block"></i>
            This site uses cookies so that I can improve the user experience.
            You can{" "}
            <Link to="/disclaimer" className="font-semibold hover:underline">
              read more here
            </Link>
            .
          </p>
          <button
            className={`btn-sm-accent m-1 ml-auto ${
              anim ? "jello-vertical-infinite" : ""
            }`}
            style={{ minWidth: 150 }}
            onClick={onChange}
          >
            Got it
          </button>
        </div>
      </div>
    );
  }
  return <div />;
};

export default Cookies;
