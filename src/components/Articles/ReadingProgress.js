import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [show, setShow] = useState(false);

  const handleSetProgress = throttle((e) => {
    setReadingProgress(e);
  }, 1000);

  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const toShow = windowScrollTop >= 80;
    if (toShow != show) {
      setShow(toShow);
    }
    if (windowScrollTop === 0) {
      return handleSetProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return handleSetProgress(100);
    }

    handleSetProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });
  if (!show) {
    return <Fragment />;
  }
  return (
    <div
      className={`bg-accent h-2 transition-all duration-1000 ease-in-out`}
      style={{
        zIndex: 20000,
        width: `${readingProgress}%`,
        top: 0,
        position: "fixed",
      }}
    />
  );
};

ReadingProgress.propTypes = {
  target: PropTypes.shape({
    current: PropTypes.shape({
      clientHeight: PropTypes.number.isRequired,
      offsetTop: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReadingProgress;
