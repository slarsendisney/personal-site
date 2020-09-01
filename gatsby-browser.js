import wrapWithProvider from "./src/state/wrapWithProvider";
import "./src/css/style.scss";
import "firebase/firestore";

export const wrapRootElement = wrapWithProvider;

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer");
    console.log("IntersectionObserver polyfilled ;)");
  }
};
