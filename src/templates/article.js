import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Article"
      />

      <section className="container mx-auto">
        <div className="flex-1 w-full max-w-4xl xl:max-w-full px-4 py-8  mx-auto md:px-8 md:py-16">
          <div className="xl:grid xl:grid-cols-8 xl:gap-4">
            <div className="hidden xl:block col-span-2">
              <div className="mr-5 ml-auto my-5 text-4xl top-0 xl:sticky w-16 pt-20">
                <div className="mt-5 p-5 bg-secondary rounded text-2xl">
                  <h1>💫</h1>
                  <h1>❤️</h1>
                  <h1>💫</h1>
                </div>
              </div>
            </div>
            <div className="col-span-4 article">
              <h1 className="">An Article Title</h1>
              <h2 className="">Introduction</h2>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                et perferendis eaque, exercitationem praesentium nihil. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                quia, nulla! Maiores et perferendis eaque, exercitationem
                praesentium nihil. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
              <h2 className="">More Content</h2>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                et perferendis eaque, exercitationem praesentium nihil. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                quia, nulla! Maiores et perferendis eaque, exercitationem
                praesentium nihil. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
              <h2 className="">More Content</h2>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                et perferendis eaque, exercitationem praesentium nihil. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                quia, nulla! Maiores et perferendis eaque, exercitationem
                praesentium nihil. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
              <h2 className="">More Content</h2>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                et perferendis eaque, exercitationem praesentium nihil. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                quia, nulla! Maiores et perferendis eaque, exercitationem
                praesentium nihil. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            <div className="hidden xl:block  col-span-2  ">
              <div className=" xl:text-left m-4 text-xl top-0 xl:sticky pt-20 w-56">
                <div className="mt-5 p-5 bg-secondary rounded">
                  <h4 className="text-xs mb-3 text-secondary">
                    TABLE OF CONTENTS
                  </h4>
                  <p className="text-base text-link font-bold">Introduction</p>
                  <p className="text-base text-secondary">Introduction</p>
                  <p className="text-base text-secondary">Introduction</p>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:hidden flex text-4xl my-10 mt-5 p-5 bg-secondary rounded text-2xl w-48 mx-auto">
            <h1>💫</h1>
            <h1>❤️</h1>
            <h1>💫</h1>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
