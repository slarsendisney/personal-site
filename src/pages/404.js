import React from "react"
import { Link } from "gatsby"
import StringSimilarity from "string-similarity"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Emojione } from "react-emoji-render"

export default ({ location, data }) => {
  const pages = data.allSitePage.nodes.map(({ path }) => path)
  const pathname = location.pathname
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch
  console.log(result.target)
  console.log(result.rating)

  function renderContent() {
    return result.rating > 0.7 ? (
      <>
        <h1 className=" margin-3-t is-grey margin-3-b">
          You were probably looking for{" "}
          <Link to={result.target} className="is-special-blue">
            {result.target}
          </Link>
        </h1>
        <h3 className="is-grey margin-3-b margin-5-t">
          Not what you're after? Click your heels together three times and say
          'There's no place like home', press the button below, and you'll be
          there.
        </h3>
      </>
    ) : (
      <>
        <h1 className="is-hero-menu margin-3-t is-grey margin-3-b">
          Yep, you're lost. ⚡️
        </h1>
        <h3 className=" is-grey margin-5-b">
          Click your heels together three times and say 'There's no place like
          home', press the button below, and you'll be there.
        </h3>
      </>
    )
  }

  return (
    <Layout>
      <SEO title={"404"} />
      <div
        className="is-light-grey-bg"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="row container pad-20-tb" style={{ maxWidth: 800 }}>
          <div className="col-xs-12">
            <h3 className="is-grey margin-1-tb">
              PAGE NOT FOUND <Emojione text="😭" />
            </h3>

            {renderContent()}

            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className=" align-horizontal is-white lato margin-4-r"
            >
              <button className="bubble-button border-radius">
                There's no place like home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`
