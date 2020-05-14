import React from "react"
import { Helmet } from "react-helmet"

function SEO({ variant }) {
  const data =
    variant === 0
      ? {
          title: "TEST A",
          desc: "test A",
          img: "https://ik.imagekit.io/sld/Logo_-CIuihSCZ.png",
        }
      : {
          title: "TEST B",
          desc: "test B",
          img: "https://ik.imagekit.io/sld/DarkMode_83Vy6Q6Wm.png",
        }

  const url = "https://sld.codes"

  return (
    <Helmet>
      <title>Sam Larsen-Disney | {data.title}</title>
      <meta name="title" content={data.title} />
      <meta name="description" content={data.desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.desc} />
      <meta property="og:image" content={data.img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Sam Larsen-Disney" />
      <meta name="twitter:title" content={data.title} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:description" content={data.desc} />
      <meta property="twitter:image" content={data.img} />
      <html lang="en" />
    </Helmet>
  )
}

export default () => {
  const variant = 1
  return (
    <>
      <SEO
        title="Disclaimer"
        description="My site disclaimer."
        variant={variant}
      />
      <div className="row container pad-10-t pad-3-lr">
        <div className="col-xs-12  is-grey">
          <h1 className="margin-2-t">This page is a test.</h1>
        </div>
      </div>
    </>
  )
}
