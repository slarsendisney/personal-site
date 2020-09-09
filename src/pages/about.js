import React, { useState } from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { OutboundLink } from "gatsby-plugin-google-analytics";

function AboutPage() {
  const [selected, setSelected] = useState(2);

  const renderBio = () => {
    switch (selected) {
      case 0:
        return <span>Sam is a UX Engineer. He loves what he does.</span>;
      case 1:
        return (
          <span>
            Sam is a UX Engineer at American Express. He cares most about
            accessibility and making a performant web. He enjoys teaching the
            next generation to code through his articles, presentations and at
            hackathons.
          </span>
        );
      case 2:
        return (
          <span>
            Sam studied Computer Science at King&apos;s College London and now
            works as a UX Engineer at American Express. He is most at home
            coding in React, Javascript, GraphQL & Gatsby but is always open to
            learning something new. When coding he likes to ensure his code is
            accessible and performant. <br /> <br /> He enjoys teaching the next
            generation to code through his articles, presentations and at
            hackathons.
          </span>
        );
      default:
        return (
          <span>
            Sam Larsen-Disney studied a Bachelors in Computer Science at
            King&apos;s College London. During his time there he taught an AI to
            play pacman and built a visual search engine that attempted to
            combat fake news. He found university frustrating as most of the
            things he learned were theoretical. He likes the work he does to
            provide value and it was because of this that he could not wait to
            join the world of work.
            <br /> <br /> He joined American Express on their technology summer
            internship in 2017. During his ten weeks as a Software Engineer at
            American Express he worked within an agile team delivering an
            internal data visualisation tool. The summer strengthened his
            competency in the Elastic Stack and Java. The company culture was
            really good and, when they offered him a graduate position, he did
            not hesitate to say “yes!“. He completed two 6 month rotations on
            the graduate scheme. He tried his hand as a Front End developer and
            User Experience Designer and realised that he wanted his role to be
            a mixture of the two. Since then he has worked in the “refer a
            friend“ and the “Design Language System“ teams as a Design Engineer.
            Here he designs and builds American Express&apos; website. When
            coding he likes to ensure his code is accessible and performant. He
            has always enjoyed leading people. He was the only graduate in his
            cohort to formally manage interns and has gone on to be the youngest
            engineer to manage graduates. <br /> <br />
            When not in the office he likes to attend hackathons. At these
            events he enjoys teaching the next generation to code and has a bit
            of a reputation for staying up all night. He also likes to take
            photos, write about tech and tinker with weekend coding projects.
          </span>
        );
    }
  };
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />
      <StaticQuery
        query={graphql`
          {
            gitHubProfile {
              totalContributions
            }
            allNpmPackage {
              totalCount
            }
            boilerplates: allMdx(
              filter: { frontmatter: { type: { eq: "Boilerplate" } } }
            ) {
              totalCount
            }
            articles: allMdx(
              filter: { frontmatter: { type: { eq: "Article" } } }
            ) {
              totalCount
            }
            site {
              siteMetadata {
                currentCompany
                currentRole
                currentCompanyURL
              }
            }
            HeroBody: file(relativePath: { eq: "Body/Floats.png" }) {
              childImageSharp {
                fluid(maxWidth: 230) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            Face: file(relativePath: { eq: "face.png" }) {
              childImageSharp {
                fluid(maxWidth: 230) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        `}
        render={(data) => (
          <>
            <section className="text-secondary bg-default  -mb-32 md:-mb-64">
              <div className="flex-1 w-full max-w-4xl px-4 py-6 mx-auto md:px-8 md:pb-16">
                <div className="w-64 md:w-6/12 m-auto relative">
                  <Img fluid={data.Face.childImageSharp.fluid} />
                  <div className="w-2/5 md:w-56 ml-auto -mt-24 md:-mt-64 -mr-8 md:-mr-32 float-y">
                    <Img fluid={data.HeroBody.childImageSharp.fluid} />
                  </div>
                </div>
              </div>
            </section>
            <section className="text-secondary bg-secondary">
              <div className="flex-1 w-full max-w-4xl px-4 pt-24 pb-8 mx-auto md:px-8 md:pt-40 md:pb-12 text-center">
                <h1 className="text-2xl md:text-5xl font-semibold ">
                  Samuel Larsen-Disney
                </h1>
                <p className="text-lg md:text-xl">
                  Designer. Engineer. Creator.
                </p>

                <Link to="/cv" className="text-base ">
                  <button className="btn-accent mt-5 w-64">View CV</button>
                </Link>
                <div className="text-5xl flex flex-wrap -mb-8 items-center justify-center">
                  <OutboundLink
                    href="https://twitter.com/SamLarsenDisney"
                    className="hover:text-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="lab la-twitter "></i>
                  </OutboundLink>
                  <OutboundLink
                    href="https://www.linkedin.com/in/samuel-larsen-disney"
                    className="hover:text-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="lab la-linkedin-in mr-1"></i>
                  </OutboundLink>
                </div>
              </div>
            </section>
            <section className="text-secondary bg-default ">
              <div className="flex-1 w-full max-w-4xl px-4 py-6 mx-auto md:px-8 md:py-16">
                <p className="text-sm text-center font-semibold mb-3 opacity-75">
                  BIO LENGTH
                </p>
                <div className="w-full flex flex-wrap items-center justify-center">
                  <p className="text-xl mr-3 hidden md:block">Shortest</p>
                  <p className="text-base mr-3 block md:hidden">Short</p>
                  {[0, 1, 2, 3].map((item) => (
                    <input
                      key={"checkbox:" + item}
                      type="checkbox"
                      checked={selected === item}
                      onClick={() => setSelected(item)}
                      className="form-checkbox cursor-pointer h-6 w-6 md:h-8 md:w-8 rounded-full  bg-default  transition duration-150 ease-in-out mr-3 border-4 border-accent"
                    />
                  ))}
                  <p className="text-base block md:hidden">Long</p>
                  <p className="text-xl hidden md:block">Longest</p>
                </div>
                <div className="flex-1 w-full max-w-4xl py-8 mx-auto  transition duration-500">
                  <h1
                    className={`${
                      selected > 0 ? "text-justify" : "text-center"
                    } text-lg md:text-3xl font-semibold text-default`}
                  >
                    {renderBio()}
                  </h1>
                </div>
              </div>
            </section>
            <section className="text-secondary bg-secondary ">
              <div className="flex-1 w-full max-w-4xl px-4 py-6 mx-auto md:px-8 md:py-16">
                <h4 className="opacity-75">THE NUMBERS</h4>
                <p className="text-lg md:text-3xl font-semibold text-default">
                  In the last year Sam has contributed{" "}
                  {data.gitHubProfile.totalContributions} times to{" "}
                  <OutboundLink
                    href="https://github.com/slarsendisney"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    open source
                  </OutboundLink>{" "}
                  projects. He has written {data.articles.totalCount}{" "}
                  <Link to="/articles" className="link">
                    articles
                  </Link>{" "}
                  and worked on 6{" "}
                  <Link to="/projects" className="link">
                    side projects
                  </Link>
                  . He maintains {data.boilerplates.totalCount}{" "}
                  <Link to="/boilerplates" className="link">
                    boilerplates
                  </Link>{" "}
                  and {data.allNpmPackage.totalCount}{" "}
                  <OutboundLink
                    href="https://www.npmjs.com/~slarsendisney"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    npm packages
                  </OutboundLink>
                  .
                </p>
                <Link to="/stats" className="text-base">
                  <button className="btn-accent mt-5 w-64">
                    See more stats
                  </button>
                </Link>
              </div>
            </section>
            <section className="text-secondary bg-default ">
              <div className="flex-1 w-full max-w-4xl px-4 py-16 mx-auto md:px-8 md:py-32">
                <p className="text-lg md:text-3xl font-semibold text-default">
                  You can find out more about Sam by exploring his{" "}
                  <Link className="link" to="/articles">
                    articles
                  </Link>
                  ,{" "}
                  <Link className="link" to="/presentations">
                    presentations
                  </Link>{" "}
                  &{" "}
                  <Link className="link" to="/projects">
                    projects
                  </Link>
                  .
                </p>
              </div>
            </section>
          </>
        )}
      />
    </Layout>
  );
}

export default AboutPage;
