import wrapWithProvider from "./src/state/wrapWithProvider";
import "./src/css/style.scss";
import "firebase/firestore";

let firebase;

if (typeof window !== "undefined") {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_SB,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  firebase = require("firebase/app");
  firebase.initializeApp(config);
}

export const wrapRootElement = wrapWithProvider;

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer");
    console.log("IntersectionObserver polyfilled ;)");
  }
};
