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
          <div className="container row pad-5">
            <div className="hide-on-big col-xs-12 is-grey is-white-bg pad-3 margin-5-b border-radius">
              <h3>This page is optimised for larger displays.</h3>
              <p>
                You seem to be on a small device, if you come back on something
                larger you can see a fully coded React CV here. Don't worry, you
                can still download it using the button below.
              </p>
            </div>
            <div className="col-xs-12 text-align-center">
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
          </div>

          <div
            className="paper "
            style={{
              backgroundColor: "",
              width: "210mm",
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
