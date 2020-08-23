import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function ContactPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Sponsor"
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
            <a target="_blank" rel="noreferrer" className="btn mx-1 my-1">
              <span>Buy Me A Coffee</span>
            </a>
            <a target="_blank" rel="noreferrer" className="btn mx-1 my-1">
              <span>My Patreon</span>
            </a>
          </div>
          <h2 className="mt-5 text-1xl lg:text-2xl text-left inline-block font-semibold opacity-75 mb-3">
            Not able to support right now?
          </h2>
          <p className="mb-3">
            That&apos;s cool and I totally get it. If you&apos;d still like to
            say thanks you can{" "}
            <span className="link">message me on twitter</span>. I really do
            like finding out what content you&apos;re enjoying so I can create
            more! You can also hit the button below to send me some love!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 mx-auto  my-5 -mx-1 text-center">
            <a target="_blank" rel="noreferrer" className="btn mx-1 my-1">
              <span>Send Some Love</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
