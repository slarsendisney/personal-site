import React from "react";
import Layout from "../components/layout";

const Uses = () => (
  <Layout>
    <section className="text-secondary bg-secondary">
      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
        <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-left mb-0">
          Site Uses
        </h1>
        <input
          className="input"
          placeholder="Articles, Projects and More!"
        ></input>
      </div>
    </section>
    <section className="text-secondary bg-default">
      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
        <h1 className="font-bold text-xl md:text-xl lg:text-2xl text-left mb-5">
          Recommended
        </h1>
      </div>
    </section>
  </Layout>
);

export default Uses;
