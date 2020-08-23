import React from "react";

import Layout from "../components/layout";
import { Link } from "gatsby";

const Disclaimer = () => {
  return (
    <Layout>
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h2 className="text-2xl font-semibold mb-3">Disclaimer</h2>
          <h3 className="text-base mb-3">
            All views expressed on this site are my own and do not represent the
            opinions of any entity whatsover with which I have been, am now or
            will be affiliated with.
          </h3>

          <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
          <h3 className="text-base mb-3">
            One of my main priorities is the privacy of visitors to the site.
            This Privacy Policy document contains types of information that is
            collected and recorded by sld.codes and how I use it.
          </h3>
          <h3 className="text-2xl font-semibold mb-3">Cookies Policy</h3>
          <h3 className="text-base mb-3">
            Cookies are files with small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            web site and stored on your computer&apos;s hard drive.
          </h3>
          <h3>
            Like any other website, sld.codes uses &apos;cookies&apos;. These
            cookies are used to store information including visitors&apos;
            preferences, and the pages on the website that the visitor accessed
            or visited. The information is used to optimize the users&apos;
            experience by customizing our web page content based on
            visitors&apos; browser type and/or other information.
          </h3>

          <h3 className="text-2xl font-semibold mb-3">Log Files</h3>
          <h3 className="text-base mb-3">
            sld.codes follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services&apos; analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users&apos; movement on the
            website, and gathering demographic information.
          </h3>

          <h3 className="text-2xl font-semibold mb-3">Third party websites</h3>
          <h3 className="text-base mb-3">
            This website includes hyperlinks to, and details of, third party
            websites. I have no control over, and are not responsible for, the
            privacy policies and practices of third parties.
          </h3>

          <h3 className="text-2xl font-semibold mb-3">Consent</h3>
          <h3 className="text-base mb-3">
            By using this website, you hereby consent to its privacy policy and
            agree to its terms.
          </h3>
          <h3>
            I reserve the right to update or change our Privacy Policy at any
            time and you should check this Privacy Policy periodically. Your
            continued use of the Service after I post any modifications to the
            Privacy Policy on this page will constitute your acknowledgment of
            the modifications and your consent to abide and be bound by the
            modified Privacy Policy.
          </h3>

          <div className="text-center my-5">
            <Link to="/">
              <button className="btn">GOT IT</button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
