import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Newsletter from "../components/Newsletter";
import { OutboundLink } from "gatsby-plugin-google-analytics";

function NewsletterPage({ data }) {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Newsletter"
        socialcard={"social-card-newsletter"}
      />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="text-4xl font-semibold mb-5">
            Like what you&apos;re reading?{" "}
            <span className="opacity-75 ">I have something for you!</span>
          </h1>

          <p className="">
            I occasionally send out a newsletter that I hope inspires you to
            build new things. They most often focus on static sites, front-end
            development, design and UX. If you&apos;re enjoying my content and
            want more, feel free to subscribe!
          </p>
        </div>
      </section>
      <section className="text-secondary bg-secondary">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 ">
          <div className="bg-secondary rounded">
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
      <section className="text-secondary bg-default">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="text-3xl font-semibold mb-5">Read Past Issues:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.newslettersJson.newsletters.map((route) => (
              <OutboundLink
                href={`/newsletters/${route}`}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <div
                  className="btn text-center w-full"
                  style={{ maxWidth: 1000 }}
                >
                  {route}
                </div>
              </OutboundLink>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  {
    newslettersJson {
      newsletters
    }
  }
`;

export default NewsletterPage;
