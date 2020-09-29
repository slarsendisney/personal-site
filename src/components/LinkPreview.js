import React, { useState } from "react";
import { graphql, StaticQuery } from "gatsby";

const LinkPreview = ({ url, hideImg }) => {
  const [loading, setLoading] = useState(true);
  return (
    <StaticQuery
      query={graphql`
        {
          allMetaData {
            nodes {
              url
              title
              image
              description
              id
            }
          }
        }
      `}
      render={(data) => {
        const preview = data.allMetaData.nodes.find((item) => item.id === url);
        if (preview) {
          return (
            <a
              href={preview.url}
              className="h-full text-default duration-500 ease-in-out transform hover:scale-105 linkPreview"
              target="_blank"
              rel="noreferrer"
            >
              <div className="bg-white shadow rounded-md p-4 w-full h-full mx-auto">
                <div className="flex space-x-4">
                  <div className="flex-1 py-1">
                    {!hideImg && (
                      <div
                        className={`h-48 rounded w-full bg-modal mb-3 ${
                          loading ? "animate-pulse" : ""
                        }`}
                      >
                        <img
                          className={`rounded w-full h-full ${
                            loading ? "hidden" : ""
                          }`}
                          style={{ objectFit: "cover" }}
                          src={preview.image}
                          onLoad={() => setLoading(false)}
                        />
                      </div>
                    )}
                    <div className="">
                      <p className="text-2xl text-blue font-semibold">
                        {preview.title}
                      </p>
                      <p
                        className="text-grey hover:no-underline"
                        dangerouslySetInnerHTML={{
                          __html: preview.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        } else {
          return (
            <div className="border-4 shadow rounded-md p-4 w-full h-full mx-auto text-center items-center">
              <h3 className="text-2xl">Metadata for this url is missing.</h3>
            </div>
          );
        }
      }}
    />
  );
};

export default LinkPreview;
