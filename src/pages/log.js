import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import firebase from "gatsby-plugin-firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

function DevLog() {
  const [logs, loading, error] = useCollectionOnce(
    typeof window !== "undefined" ? firebase.firestore().collection("logs") : ""
  );
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Dev Log"
        socialcard={"social-card-log"}
      />
      <section className="text-secondary bg-default px-2">
        <div className=" max-w-xl mx-auto m-8 prose">
          <h1>Dev Log. </h1>
          <h2>My work in progress, design inspiration, questionable creations, & random life updates. All the stuff too short for an article.</h2>
        </div>
        <div className="relative max-w-xl mx-auto m-8">
          <div
            className="border-r-2 border-primary absolute h-full top-0"
            style={{ left: 15 }}
          ></div>
          <ul className="list-none m-0 p-0">
            {!error &&
              !loading &&
              logs.docs.map((doc) => (
                <li className="mb-2" key={doc.id}>
                  <div className="flex items-center mb-1">
                    <div className="bg-primary rounded-full h-8 w-8"></div>

                    <div className="flex-1 ml-4 font-medium">
                      <h2 className="text-sm">{doc.data().currentDate}</h2>
                    </div>
                  </div>
                  <div className="relative ml-12 mb-5 max-w-2xl">
                    <div
                      className="prose prose-sm text-secondary "
                      dangerouslySetInnerHTML={{ __html: doc.data().html }}
                    ></div>
                  </div>
                  <div className="ml-12"></div>
                </li>
              ))}
            <li className="mb-2">
              <div className="flex items-center mb-1">
                <div className="bg-primary rounded-full h-8 w-8"></div>
                <div className="flex-1 ml-4 font-medium">
                  <h2 className="text-base text-gray-400">Start of feed!</h2>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default DevLog;
