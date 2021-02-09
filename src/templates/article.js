import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import VisibilitySensor from "react-visibility-sensor";
import Layout from "../components/layout";
import ReadingProgress from "../components/Articles/ReadingProgress";
import SEO from "../components/seo";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import AnchorLink from "react-anchor-link-smooth-scroll";
import StickyLike from "../components/Articles/StickyLike";
import Newsletter from "../components/Newsletter";

deckDeckGoHighlightElement();

const TableOfContents = ({ tableOfContents, currentHeading, depth = 0 }) => {
  return (
    <ul className="">
      {tableOfContents.items.map((item) => {
        return (
          <li key={item.title}>
            <AnchorLink offset="30" href={item.url}>
              <p
                className={`text-base ml-${depth * 2} ${
                  currentHeading === item.title
                    ? "text-link font-semibold"
                    : "text-secondary"
                }`}
              >
                {item.title}
              </p>
            </AnchorLink>
            {item.items && (
              <TableOfContents
                tableOfContents={item}
                currentHeading={currentHeading}
                depth={depth + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

TableOfContents.propTypes = {
  tableOfContents: PropTypes.shape({
    items: PropTypes.arrayOf({ title: PropTypes.string }),
  }),
  depth: PropTypes.number,
  currentHeading: PropTypes.string.isRequired,
};

const Article = ({ data }) => {
  const { mdx } = data;
  const target = React.createRef();
  const [currentHeading, setCurrentHeading] = useState("");
  useEffect(() => {
    if (mdx.tableOfContents.items) {
      setCurrentHeading(mdx.tableOfContents.items[0].title);
    }
  }, []);
  function onChange(isVisible, name) {
    if (isVisible) {
      setCurrentHeading(name);
    }
  }
  const Heading = (props) => {
    const CustomTag = `h${props.priority}`;
    return (
      <VisWatcher name={props.children}>
        <CustomTag {...props}>{props.children}</CustomTag>
      </VisWatcher>
    );
  };

  Heading.propTypes = {
    priority: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  };

  const VisWatcher = ({ children, name }) => {
    return (
      <VisibilitySensor onChange={(e) => onChange(e, name)}>
        {children}
      </VisibilitySensor>
    );
  };

  VisWatcher.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  const components = {
    h1: function h1(e) {
      return <Heading {...e} priority={1} />;
    },
    h2: function h2(e) {
      return <Heading {...e} priority={2} />;
    },
    h3: function h3(e) {
      return <Heading {...e} priority={3} />;
    },
    h4: function h4(e) {
      return <Heading {...e} priority={4} />;
    },
    h5: function h5(e) {
      return <Heading {...e} priority={5} />;
    },
    h6: function h6(e) {
      return <Heading {...e} priority={6} />;
    },
  };
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={mdx.frontmatter.title}
        socialcard={mdx.fields.socialcard}
      />
      <ReadingProgress target={target} />
      <section
        className={`${mdx.frontmatter.legacy ? "" : "container"} mx-auto`}
      >
        <div className="flex-1 w-full max-w-4xl xl:max-w-full px-4 py-8  mx-auto md:px-8 md:py-16">
          <div className="xl:grid xl:grid-cols-8 xl:gap-4 ">
            <div className="hidden xl:block col-span-2 mt-12">
              <div className="mr-5 ml-auto my-5 text-4xl w-16 sticky top-0 pt-8">
                <div className="mt-5 p-1 pt-3  rounded text-2xl">
                  <StickyLike />
                </div>
              </div>
            </div>
            <div
              className={`col-span-4 ${mdx.frontmatter.legacy ? "legacy" : ""}`}
              ref={target}
            >
              {mdx.frontmatter.legacy && (
                <div className="bg-secondary text-secondary text-center p-3 rounded">
                  <i className="las la-exclamation-circle  text-3xl"></i>
                  <p className="">
                    This article was created with{" "}
                    <span className="font-semibold">legacy styles</span> and may
                    look a little strange!
                  </p>
                </div>
              )}
              <h1 className="text-2xl md:text-4xl font-bold mb-3">
                {mdx.frontmatter.title}
              </h1>
              <div className="flex flex-wrap">
                {mdx.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="font-bold bg-primary text-primary hover:bg-primary-light  mr-1 mb-3 py-1 px-2 rounded-full text-sm"
                  >
                    {tag.toUpperCase()}
                  </Link>
                ))}
              </div>
              <div>
                <div className="prose text-secondary">
                  <MDXProvider components={components}>
                    <MDXRenderer>{mdx.body}</MDXRenderer>
                  </MDXProvider>
                </div>
              </div>
            </div>
            <div className="hidden xl:block col-span-2  mt-12">
              <div className="xl:text-left m-4 text-xl sticky top-0 pt-8 w-56">
                {mdx.tableOfContents && mdx.tableOfContents.items && (
                  <div className="mt-5 -mr-5 p-5 bg-secondary rounded">
                    <h4 className="text-xs mb-3 text-secondary">
                      TABLE OF CONTENTS
                    </h4>
                    <TableOfContents
                      currentHeading={currentHeading}
                      tableOfContents={mdx.tableOfContents}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:hidden flex text-4xl my-10 mt-5 px-1 pt-4  justify-center bg-secondary rounded text-2xl w-64 mx-auto">
            <StickyLike />
          </div>
          <div className="xl:grid xl:grid-cols-8 xl:gap-4 ">
          <div className="hidden xl:block col-span-2"/>
          <div className="col-span-4 rounded bg-primary py-1 px-3 mt-6">
            <Newsletter imgsm/>
          </div>
          <div className="hidden xl:block col-span-2"/>
          </div>
        </div>
      </section>
    </Layout>
  );
};
Article.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      fields: PropTypes.shape({
        socialcard: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        wide: PropTypes.bool.isRequired,
        legacy: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }),
      tableOfContents: PropTypes.shape({
        items: PropTypes.arrayOf({ title: PropTypes.string }),
      }),
      body: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export const pageQuery = graphql`
  query($slug: String!) {
    sitePage(path: { eq: $slug }) {
      context {
        slug
        articlePage
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      tableOfContents
      fields {
        socialcard
      }
      frontmatter {
        title
        wide
        desc
        date
        legacy
        tags
      }
    }
  }
`;

export default Article;
