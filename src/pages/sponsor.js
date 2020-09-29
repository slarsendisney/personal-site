import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../components/layout";
import SEO from "../components/seo";
import firebase from "gatsby-plugin-firebase";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import urls from "../data/urls.json";

const ContactPage = ({ foundTheme }) => {
  const [localCount, setLocalCount] = useState(0);
  const [thanks, loadingThanks] = useDocumentDataOnce(
    firebase.firestore().doc("thanks/thanks")
  );

  let thanksCount = loadingThanks ? "..." : thanks.count + localCount;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Sponsor"
        socialcard="social-card-sponsor"
      />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="text-4xl font-semibold mb-5">Support Me</h1>
          <p className="text-base mb-5">
            My site has no ads or sponsors. If you&apos;ve enjoyed my content
            and learnt something new please consider supporting what I do.{" "}
            <strong>There is no better way to say thanks!</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 mx-auto  my-5 -mx-1 text-center">
            <OutboundLink
              href={urls.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="btn-accent mx-1 my-1"
            >
              <div className="flex items-center justify-center">
                <i className="text-2xl las la-coffee m-0 mr-1 animate-bounce"></i>{" "}
                Buy Me A Coffee
              </div>
            </OutboundLink>
            <OutboundLink
              href={urls.patreon}
              target="_blank"
              rel="noreferrer"
              className="btn mx-1 my-1"
            >
              <div className="flex items-center justify-center">
                <i className="text-2xl lab la-patreon m-0 mr-1"></i>My Patreon
              </div>
            </OutboundLink>
          </div>
          <h2 className="mt-5 text-1xl lg:text-2xl text-left inline-block font-semibold opacity-75 mb-3">
            Not able to support right now?
          </h2>
          <p className="mb-3">
            That&apos;s cool and I totally get it. If you&apos;d still like to
            say thanks you can{" "}
            <OutboundLink
              href={urls.twitter}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              message me on twitter
            </OutboundLink>
            . I really do like finding out what content you&apos;re enjoying so
            I can create more! You can also hit the button below to send me some
            love!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 mx-auto  my-5 -mx-1  items-center">
            <button
              onClick={() => {
                if (localCount === 0) {
                  foundTheme("Matrix");
                }
                setLocalCount(localCount + 1);
                fetch(`${urls.api}/thanks`, {
                  method: "POST",
                });
              }}
              className="btn mx-1 my-1 text-center"
            >
              <span>Send Virtual Thanks</span>
            </button>
            <div className="flex items-center justify-center text-xl opacity-75">
              <i className="text-2xl las la-glass-cheers m-0 mr-1"></i>
              {thanksCount} Virtual Thanks Sent.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

ContactPage.propTypes = {
  foundTheme: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    foundTheme: (theme) => dispatch({ type: "foundTheme", data: theme }),
  };
};

const ConnectedContactPage =
  typeof window !== `undefined`
    ? connect(null, mapDispatchToProps)(ContactPage)
    : ContactPage;

export default ConnectedContactPage;
