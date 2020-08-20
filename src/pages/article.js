import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Article"
      />

      <section className="flex flex-col items-center md:flex-row"></section>
    </Layout>
  );
}

export default AboutPage;
