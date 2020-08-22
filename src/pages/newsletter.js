import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Newsletter from "../components/Newsletter";

function ContactPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Contact"
      />
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <Newsletter />
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
