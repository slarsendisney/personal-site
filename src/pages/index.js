import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

const Card = () => (
  <div className="w-full  md:w-1/3  mb-4  overflow-hidden shadow-lg card">
    <div className="m-1 bg-default text-secondary rounded">
      <figure className="tint">
        <img
          className="w-full"
          src="https://sld.codes/static/a1d25744b7dc5d4df740375da4f59fd4/31987/hero.png"
          alt="Sunset in the mountains"
        />
      </figure>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-secondary text-secondary rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-secondary text-secondary rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-secondary text-secondary rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  </div>
);
function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
        <h1 className="inline-block p-3 mb-4 text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold">
          Sam Larsen-Disney
        </h1>

        <h2 className="leading-loose text-2xl">
          I have built new ways to refer friends, onboarding experiences and
          rapid response systems. I enjoy teaching the next generation to code
          through my{" "}
          <Link
            className="font-bold text-secondary no-underline"
            to="/articles"
          >
            articles
          </Link>
          ,{" "}
          <Link
            className="font-bold text-secondary no-underline"
            to="/presentations"
          >
            presentations
          </Link>{" "}
          and at hackathons.
        </h2>
      </section>

      <section className="text-primary bg-primary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Recent Posts
          </h1>
          <div className="flex flex-wrap">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;
