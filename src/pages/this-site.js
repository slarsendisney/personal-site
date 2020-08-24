import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const inspirers = [
  "JoshWComeau",
  "mxbck",
  "yannispanagis",
  "celikkoseoglu",
  "jxnblk",
];
const ThisSite = () => (
  <Layout>
    <section className="text-secondary flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        About This Site
      </h1>
      <p className=" mb-3">
        This site is my corner of the internet. I use it to experiment and
        document my front-end adventures.
      </p>
      <p className="mb-8">
        The site has been redesigned and rebuilt many times. Its current tech
        stack uses GatsbyJS, Redux, Socket.IO, Tailwind & Firebase. All UX
        design and code was completed by me with a little inspiration. You can
        read about how parts of the site were created by{" "}
        <span className="link">reading my articles</span>.
      </p>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Inspiration
      </h1>
      <p className="">
        This site contains many ideas inspried by some awesome developers, I
        encourage you to check out their work.
      </p>
      <div className="flex flex-wrap mb-8 text-xl">
        {inspirers.map((name, index) => (
          <a
            key={name}
            href={"https://twitter.com/" + name}
            className="font-bold text-link no-underline hover:underline"
          >
            @{name}
            {index !== inspirers.length - 1 && <span className="mr-1">,</span>}
          </a>
        ))}
      </div>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Frequently Asked Questions
      </h1>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            Can I this site&apos;s code?
          </p>
          <p className="">
            Yes, you can fork this repo (link at the bottom of this page!). The
            code is provided as is, and is not guaranteed to work on your
            machine or for your paticular use case. If you have questions about
            implementation, please refer to the github readme and the Gatsby
            docs.
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            What is the best way to credit you?
          </p>
          <p className="">
            Please give me proper credit by linking back to sld.codes. I want to
            keep this site open source howevers it&apos;s always disheartening
            to find that someone has copied my work without giving me credit. I
            spent a non-trivial amount of effort building and designing
            sld.codes, and I am proud of it! All I ask of you is to not claim
            this effort as your own.
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900">
            How can I support you?
          </p>
          <p className="">
            My site has no ads or sponsors. If you&apos;ve enjoyed my content or
            used this site&apos;s code please consider supporting what I do.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-2xl text-center">
        <a
          href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto/CSS_FAQ"
          target="_blank"
          rel="noreferrer"
          className="bg-primary hover:bg-primary-light text-primary text-md py-3 px-5 my-1 mx-1 rounded"
        >
          <span>Learn more on the GitHub Repo</span>
        </a>
        <Link
          className="bg-primary hover:bg-primary-light text-primary  text-md py-3 px-5 my-1 mx-1 rounded"
          to="/sponsor"
        >
          Say thanks
        </Link>
      </div>
    </section>
  </Layout>
);

export default ThisSite;
