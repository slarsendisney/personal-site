import React from "react";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import { PDFExport } from "@progress/kendo-react-pdf";
import CV from "../components/CV/CV";
import CVSmall from "../components/CV/CVSmall";
import Layout from "../components/layout";
import SEO from "../components/seo";

class CVPage extends React.Component {
  pdfExportComponent;
  render() {
    return (
      <Layout>
        <SEO
          keywords={[`Sam`, `Larsen-Disney`, `About`, `Me`]}
          title="CV"
          socialcard={"social-card-cv"}
        />
        <div className="w-full text-center">
          <button
            className="btn-accent my-8"
            onClick={() => {
              trackCustomEvent({
                category: "CV",
                action: "Click",
                label: "CV Download Button",
              });
              this.pdfExportComponent.save();
            }}
          >
            Download CV
          </button>
        </div>
        <div className="block md:hidden bg-white text-black p-2 mx-2">
          <CVSmall />
        </div>
        <div className="paper mb-8">
          <PDFExport
            scale={0.75}
            paperSize="A4"
            margin="0cm"
            ref={(component) => (this.pdfExportComponent = component)}
            fileName="CV-SamuelLarsen-Disney"
          >
            <CV />
          </PDFExport>
        </div>
      </Layout>
    );
  }
}
export default CVPage;
