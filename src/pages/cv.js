import React from "react"
import { PDFExport } from "@progress/kendo-react-pdf"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { styles } from "../components/CV/cvStyles"
import Cv from "../components/CV/Cv"

export default class extends React.Component {
  pdfExportComponent
  render() {
    return (
      <Layout>
        <SEO title="CV" />
        <div className="is-light-grey-bg is-black-always pad-10-b">
          <div className="container row ">
            <div className="col-xs-12 pad-5 text-align-center">
              <button
                className="bubble-button border-radius"
                onClick={() => {
                  this.pdfExportComponent.save()
                }}
                style={{ width: 220 }}
              >
                DOWNLOAD PDF
              </button>
            </div>
            <div className="col-xs-12 pad-5-t flex align-vertical align-horizontal">
              <div className="hide-on-big mobile-cv is-white-bg-always">
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
              scale={0.74}
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
