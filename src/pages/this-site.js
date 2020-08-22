import React from "react";
import Layout from "../components/layout";

const ThisSite = () => (
  <Layout>
    <section className="text-secondary flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        About This Site
      </h1>
      <p className="text-gray-700 mb-8">
        Following on from the previous article, sometimes making complex UI
        controls that involve unsemantic HTML and dynamic JavaScript-updated
        content can be difficult. WAI-ARIA is a technology that can help with
        such problems by adding in further semantics that browsers and assistive
        technologies can recognize and use to let users know what is going on.
        Here well show how to use it at a basic level to improve accessibility.
      </p>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Inspiration
      </h1>
      <p className="text-gray-700 mb-8">
        Following on from the previous article, sometimes making complex UI
        controls that involve unsemantic HTML and dynamic JavaScript-updated
        content can be difficult. WAI-ARIA is a technology that can help with
        such problems by adding in further semantics that browsers and assistive
        technologies can recognize and use to let users know what is going on.
        Here well show how to use it at a basic level to improve accessibility.
      </p>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Frequently Asked Questions
      </h1>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            Can I this site&apos;s code?
          </p>
          <p className="text-gray-700">
            This article starts off the module with a good look at what
            accessibility is — this includes what groups of people we need to
            consider and why, what tools different people use to interact with
            the web, and how we can make accessibility part of our web
            development workflow.
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            What is the best way to credit you?
          </p>
          <p className="text-gray-700">
            CSS and JavaScript, when used properly, also have the potential to
            allow for accessible web experiences, but if misused they can
            significantly harm accessibility. This article outlines some CSS and
            JavaScript best practices that should be considered to ensure that
            even complex content is as accessible as possible.
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            How can I support you?
          </p>
          <p className="text-gray-700">
            Following on from the previous article, sometimes making complex UI
            controls that involve unsemantic HTML and dynamic JavaScript-updated
            content can be difficult. WAI-ARIA is a technology that can help
            with such problems by adding in further semantics that browsers and
            assistive technologies can recognize and use to let users know what
            is going on. Here well show how to use it at a basic level to
            improve accessibility.
          </p>
        </div>
      </div>
      <div className="text-center mt-10">
        <a
          href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto/CSS_FAQ"
          target="_blank"
          rel="noreferrer"
          className="bg-primary hover:bg-primary-light text-primary  text-md py-3 px-5 rounded"
        >
          <span>Learn more on the GitHub Repo</span>
        </a>
      </div>
    </section>
  </Layout>
);

export default ThisSite;
