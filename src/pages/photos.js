import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "react-photo-gallery"
import PhotoGallery from "../data/photos"

function chunkArray(myArray, chunk_size) {
  var index = 0
  var arrayLength = myArray.length
  var tempArray = []

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}
// Split

export default () => {
  return (
    <Layout>
      <SEO title={"Bio"} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-10">
          <div className="col-xs-12 ">
            <Link to="/start" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Home`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">Photography</h1>
            <div className="line margin-3-t margin-3-b" />
          </div>
          <div className="col-xs-12">
            <h3 className="">
              When I am not coding, I ❤️ taking photos. My passion is wildlife
              and landscape but I have also dabbled in portrait, wedding and
              band photography. For enquiries please email me at
              <span className="is-pink-always"> s.larsendisney@gmail.com</span>.
            </h3>
            {PhotoGallery.map(item => (
              <>
                <h1>{item.name}</h1>
                {chunkArray(item.photos, 3).map(row => (
                  <Gallery photos={row} />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
