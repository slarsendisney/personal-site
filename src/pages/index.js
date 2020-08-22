import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import HeroBody from "../images/Body/Thinking.png";
import HeroTorso from "../images/Torso/Thinking.png";
import Bulb from "../images/Item/Bulb.png";
import Newsletter from "../components/Newsletter";

const CardText = () => (
  <div className="cursor-pointer  md:w-1/2 mb-3 duration-500 ease-in-out transform hover:scale-105">
    <div className="m-1 ml-2 mr-2 py-4 px-8 bg-default text-default shadow-lg rounded-lg">
      <div>
        <h2 className="text-2xl font-semibold">Design Tools</h2>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!
        </p>
      </div>
      <div className="mt-2 flex flex-wrap">
        {["Gatsby", "UX"].map((tag) => (
          <button
            key="tag"
            className="inline-block bg-primary hover:bg-primary-light text-primary  duration-500 ease-in-out transform  rounded-full px-3 py-1 text-sm font-semibold mr-1 mb-2"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Card = () => (
  <div className="card w-full cursor-pointer  md:w-1/3 mb-4 duration-500 ease-in-out transform hover:scale-105">
    <div className="bg-default text-default shadow-lg rounded-lg rounded m-1 ml-2 mr-2">
      <div className="">
        <figure className="tint w-full">
          <img
            className="rounded-t"
            src="https://sld.codes/static/a1d25744b7dc5d4df740375da4f59fd4/31987/hero.png"
            alt="Sunset in the mountains"
            style={{ maxHeight: 200, width: "100%", objectFit: "cover" }}
          />
        </figure>
      </div>
      <div className="p-2">
        <h2 className="font-semibold text-xl">The Coldest Sunset</h2>
        <p className="text-default text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>

        <div className="mt-2 flex flex-wrap">
          {["Gatsby", "UX"].map((tag) => (
            <button
              key="tag"
              className="inline-block bg-primary hover:bg-primary-light text-primary  duration-500 ease-in-out transform  rounded-full px-3 py-1 text-sm font-semibold mr-1 mb-2"
            >
              {tag}
            </button>
          ))}
        </div>
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

      <section className="text-left text-secondary flex-1 w-full max-w-4xl px-6 pt-8 mx-auto md:px-8 md:pt-16 ">
        <div className="grid grid-cols-8 gap-4 w-full">
          <div className="lg:col-span-6 md:col-span-5 col-span-8 mb-12 px-3">
            <h1 className="inline-block text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold md:-mr-16">
              Sam Larsen-Disney
            </h1>
            <h2 className="leading-loose text-xl md:text-1xl lg:text-2xl ">
              I have built new ways to refer friends, onboarding experiences and
              rapid response systems. I enjoy teaching the next generation to
              code through my{" "}
              <Link
                className="font-bold text-link no-underline hover:underline"
                to="/articles"
              >
                articles
              </Link>
              ,{" "}
              <Link
                className="font-bold text-link no-underline hover:underline"
                to="/presentations"
              >
                presentations
              </Link>{" "}
              and at hackathons.
            </h2>
          </div>
          <div className="col-span-2 lg:-mb-24 hidden lg:block">
            <img src={Bulb} className="w-8 ml-16 mb-5" />
            <img src={HeroBody} className="" />
          </div>
          <div className="col-span-8 md:col-span-3 md:mt-auto md:-ml-16 lg:-mb-24 block lg:hidden">
            <div className="mx-auto w-full">
              <div className="md:ml-2 mr-16">
                <img
                  src={Bulb}
                  className="w-10 md:w-8 md:ml-32 mb-5  mx-auto"
                />
              </div>
              <img src={HeroTorso} className="w-2/3 max-w-xs mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Latest Posts
          </h1>
          <div className="flex flex-wrap">
            <CardText />
            <CardText />
            <CardText />
            <CardText />
          </div>
          <div className="text-right">
            <Link to="/articles" className="link-bar">
              <h3 className="font-bold">
                ALL ARTICLES <i className="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-compliment  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Recent Projects
          </h1>
          <div className="flex flex-wrap">
            <Card />
            <Card />
            <Card />
          </div>
          <div className="text-right">
            <Link to="/projects" className="link-bar">
              <h3 className="font-bold">
                ALL PROJECTS <i className="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-center text-secondary bg-secondary  ">
        <div className="w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Conferences and Hackathons
          </h1>
          <Link to="/this-site">
            <button className="bg-primary hover:bg-primary-light text-primary max-w-md w-8/12 text-md py-3 px-5 rounded">
              Upcoming Events
            </button>
          </Link>
        </div>
      </section>
      <section className="text-primary bg-primary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <Newsletter />
        </div>
      </section>
      <section className="text-center text-secondary flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
        <div className="w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            For The People Who Prefer Paper
          </h1>
          <Link to="/this-site">
            <button className="bg-primary hover:bg-primary-light text-primary max-w-md w-8/12 text-md py-3 px-5 rounded">
              View CV
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;
