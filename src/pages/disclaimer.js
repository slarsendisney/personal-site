import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default () => {
  return (
    <Layout>
      <SEO title="Disclaimer" description="My site disclaimer." />
      <div className="row container pad-10-tb pad-3-lr">
        <div className="col-xs-12  is-grey">
          <h2 className="margin-0-b">DISCLAIMER</h2>
          <h3 className="margin-2-t">
            All views expressed on this site are my own and do not represent the
            opinions of any entity whatsover with which I have been, am now or
            will be affiliated with.
          </h3>
        </div>
        <div className="col-xs-12  is-grey">
          <h2 className="margin-0-b">PRIVACY POLICY</h2>
          <h3 className="margin-2-t">
            One of my main priorities is the privacy of visitors to the site.
            This Privacy Policy document contains types of information that is
            collected and recorded by sld.codes and how I use it.
          </h3>
          <h3 className="margin-0-b">COOKIES POLICY</h3>
          <h3 className="margin-2-t">
            Cookies are files with small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            web site and stored on your computer's hard drive.
          </h3>
          <h3>
            Like any other website, sld.codes uses 'cookies'. These cookies are
            used to store information including visitors' preferences, and the
            pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </h3>
        </div>
        <div className="col-xs-12  is-grey">
          <h3 className="margin-0-b">LOG FILES</h3>
          <h3 className="margin-2-t">
            sld.codes follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
          </h3>
        </div>
        <div className="col-xs-12  is-grey">
          <h3 className="margin-0-b">Third party websites</h3>
          <h3 className="margin-2-t">
            This website includes hyperlinks to, and details of, third party
            websites. I have no control over, and are not responsible for, the
            privacy policies and practices of third parties.
          </h3>
        </div>
        <div className="col-xs-12  is-grey">
          <h3 className="margin-0-b">CONSENT</h3>
          <h3 className="margin-2-t">
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
        </div>
        <div className="col-xs-12 margin-5-t text-align-center">
          <Link to="/">
            <button className="bubble-button is-white-always border-radius pad-4-lr pad-2-tb">
              GOT IT
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
