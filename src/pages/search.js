import React, { Component, useState } from "react"
import { StaticQuery, Link } from "gatsby"
import { graphql } from "gatsby"
import { Index } from "elasticlunr"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeartsAnimation from "../components/HeartsAnimation"

const types = [
  {
    type: "Article",
    bg: "pink",
    text: "white",
  },
  {
    type: "Project",
    bg: "special-blue",
    text: "white",
  },
  {
    type: "Boilerplate",
    bg: "light-blue",
    text: "white",
  },
  {
    type: "Presentation",
    bg: "green",
    text: "white",
  },
  {
    type: "Bio",
    bg: "red",
    text: "white",
  },
]

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="input is-dark-blue"
          placeholder="Search articles, projects, presentations and more..."
          value={this.state.query}
          onChange={this.search}
        />
        <div className="row margin-3-t">
          {this.state.results.map((page) => {
            const colour = types.find((item) => item.type === page.type) || {
              bg: "special-blue",
            }
            return (
              <div className="col-xs-12 margin-5-b grow" key={page.id}>
                <Link to={"/" + page.path} className="is-grey">
                  <h2 className="margin-0">{page.title}</h2>
                  <p className="margin-1-tb">{page.desc}</p>
                  <p className={`margin-0 is-${colour.bg}-always`}>
                    {page.type}
                  </p>
                </Link>
              </div>
            )
          })}
          {(this.state.query === "Carlota" ||
            this.state.query === "carlota") && (
            <>
              <div className="col-xs-12 ">
                <h1 className="is-hero-menu is-pink-always text-align-center">
                  Love you ❤️
                </h1>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  overflow: "hidden",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              >
                <HeartsAnimation />
              </div>
            </>
          )}
          {this.state.query.length > 0 &&
            this.state.results.length === 0 &&
            (this.state.query !== "Carlota" ||
              this.state.query === "carlota") && (
              <div className="col-xs-12 ">
                <h4>No results found matching that search term.</h4>
              </div>
            )}
        </div>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = (evt) => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true })
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
    console.log(this.state.results)
  }
}

export default () => {
  return (
    <Layout>
      <SEO title={"Search"} />
      <div className="row container pad-10-t">
        <div className="col-xs-12 pad-2-lr pad-10-b">
          <h1 className="is-hero-sub-menu is-grey margin-0"> 🔎 Site Search</h1>
          <StaticQuery
            query={graphql`
              query SearchIndexQuery {
                siteSearchIndex {
                  index
                }
              }
            `}
            render={(data) => (
              <Search searchIndex={data.siteSearchIndex.index} />
            )}
          />
        </div>
      </div>
    </Layout>
  )
}
