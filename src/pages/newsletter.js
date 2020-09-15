import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Newsletter from "../components/Newsletter";

function ContactPage() {
  return (
    <Layout>
      <SEO
        location={location}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Contact"
      />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="text-4xl font-semibold mb-5">
            Like what you&apos;re reading?{" "}
            <span className="opacity-75 ">I have something for you!</span>
          </h1>

          <p className="mb-5">
            I write new articles every week that I hope inspire you to build new
            things. They most often focus on static sites and front-end
            development. If you&apos;re enjoying my content and want to hear
            when I post something new, feel free to subscribe to my newsletter!
          </p>

          <div className="bg-secondary px-5 pb-5 rounded">
            <Newsletter nodesc />
            <p className="">
              <strong>
                Never any spam and you can unsubscribe at any time.
              </strong>
            </p>
          </div>
          <h2 className="mt-5 text-1xl lg:text-2xl text-left inline-block font-semibold opacity-75">
            Don&apos;t want me filling your inbox?
          </h2>
          <p className="mb-3">
            That&apos;s cool. If you&apos;d like to keep up with my content
            another way, you can{" "}
            <span className="link">follow me on twitter</span>. Whenever I post
            new content, I like to talk about it there.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
