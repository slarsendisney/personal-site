import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import SEO from "../components/seo";

const inspirers = [
  "JoshWComeau",
  "mxbck",
  "yannispanagis",
  "celikkoseoglu",
  "jxnblk",
  "duncanbain",
  "wesbos",
  "jlengstorf",
  "ryangregorydev",
];

const ThisSite = () => (
  <Layout>
    <SEO title="About This Site" socialcard="social-card-about-this-site" />
    <section className="text-secondary flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        About This Site
      </h1>
      <p className=" mb-3">
        This site is my corner of the internet. I use it to experiment and
        document my front-end adventures.
      </p>
      <p className="mb-3">
        The site has been redesigned and rebuilt many times. Its current tech
        stack uses GatsbyJS, Redux, Socket.IO, Tailwind & Firebase. All UX
        design and code was completed by me with a little inspiration. You can
        read about how parts of the site were created by{" "}
        <span className="link">reading my articles</span>.
      </p>
      <p className="mb-8">
        This site features photography by{" "}
        <OutboundLink
          href={"https://twitter.com/thepaulbalaji"}
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          @thepaulbalaji
        </OutboundLink>{" "}
        and 3D illustrations by{" "}
        <OutboundLink
          href={"https://www.instagram.com/allsortscreativeuk/"}
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          @allsortscreativeuk
        </OutboundLink>
        .
      </p>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Inspiration
      </h1>
      <p className="">
        This site contains many ideas inspired by some awesome developers and
        designers, I encourage you to check out their work.
      </p>
      <div className="flex flex-wrap mb-8 text-xl">
        {inspirers.map((name, index) => (
          <OutboundLink
            key={name}
            href={"https://twitter.com/" + name}
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            @{name.toLowerCase()}
            {index !== inspirers.length - 1 && <span className="mr-1">,</span>}
          </OutboundLink>
        ))}
      </div>
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-5">
        Frequently Asked Questions
      </h1>
      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900 text-base lg:text-xl">
            Can I use this site&apos;s code?
          </p>
          <p className="">
            Yes, you can fork this repo (link at the bottom of this page!). The
            code is provided as is, and is not guaranteed to work on your
            machine or for your paticular use case.
          </p>
          <p>
            <strong>
              Please note that while the code is free for anyone to use, I
              reserve the rights to all images on this site unless specified
              otherwise.
            </strong>
          </p>
        </div>
      </div>

      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900 text-base lg:text-xl">
            Can you help me get started?
          </p>
          <p className="">
            If you have questions about implementation, please refer to the
            github readme and the Gatsby docs. I have spent considerable time
            ensuring that there are comments throughout the code to help you get
            started. Due to the amount of requests I recieve, I cannot help
            individuals but may answer the odd question on twitter.
          </p>
        </div>
      </div>

      <div className="flex items-start justify-start mb-8">
        <div>
          <p className="font-semibold mt-0 mb-3 text-gray-900 text-base lg:text-xl">
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
          <p className="font-semibold mt-0 mb-3 text-gray-900 text-base lg:text-xl">
            How can I support you?
          </p>
          <p className="">
            My site has no ads or sponsors. If you&apos;ve enjoyed my content or
            used this site&apos;s code please consider supporting what I do.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-2xl text-center">
        <OutboundLink
          href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto/CSS_FAQ"
          target="_blank"
          rel="noreferrer"
          className="btn text-md py-3 px-5 my-1 mx-1 rounded"
        >
          <div className="justify-center align-center flex">
            <span>Visit the GitHub Repo</span>
            <i className="lab la-github ml-1 text-2xl"></i>
          </div>
        </OutboundLink>
        <Link
          className="btn-accent text-md py-3 px-5 my-1 mx-1 rounded"
          to="/sponsor"
        >
          <div className="justify-center align-center flex">
            <span>Say thanks</span>
            <i className="las la-heart text-xl ml-1"></i>
          </div>
        </Link>
      </div>
    </section>
  </Layout>
);

export default ThisSite;
