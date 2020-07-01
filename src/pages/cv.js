import React from "react"
import { PDFExport } from "@progress/kendo-react-pdf"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { styles } from "../components/CV/cvStyles"
import Cv from "../components/CV/Cv"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { Helmet } from "react-helmet"

export default class extends React.Component {
  pdfExportComponent
  render() {
    return (
      <Layout>
        <Helmet>
          <meta name="googlebot" content="noindex" />
        </Helmet>
        <SEO title="CV" />
        <div className="is-light-grey-bg is-black-always pad-10-b">
          <div className="container row ">
            <div className="col-xs-12 pad-5 text-align-center">
              <button
                className="bubble-button border-radius"
                onClick={() => {
                  trackCustomEvent({
                    category: "CV",
                    action: "Click",
                    label: "CV Download Button",
                  })
                  this.pdfExportComponent.save()
                }}
                style={{ width: 220 }}
              >
                DOWNLOAD PDF
              </button>
            </div>
            <div className="col-xs-12 flex align-vertical align-horizontal">
              <div className="hide-on-big mobile-cv is-white-bg-always pad-3">
                <Cv small={true} />
              </div>
            </div>
          </div>

          <div
            className="paper"
            style={{
              backgroundColor: "",
              maxWidth: "210mm",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <PDFExport
              scale={0.75}
              paperSize="A4"
              margin="0cm"
              ref={(component) => (this.pdfExportComponent = component)}
              fileName="CV-SamuelLarsen-Disney"
            >
              <Cv />
            </PDFExport>
            <style>{styles}</style>
          </div>
        </div>
      </Layout>
    )
  }
}
