import React from "react"
import GatsbyMonogram from "../../images/GatsbyMonogram.svg"
import { Link } from "gatsby"

const getLogo = (featureLocation) => {
  switch (featureLocation) {
    case "gatsby":
      return <img src={GatsbyMonogram} />
    default:
      return <img src={GatsbyMonogram} />
  }
}
const getfeatureLocation = (feature) => {
  if (feature.includes("gatsby")) {
    return "gatsby"
  }
}

const getfeatureLabel = (featureLocation) => {
  switch (featureLocation) {
    case "gatsby":
      return "the GatsbyJS Blog"
    default:
      return "the Blog"
  }
}

const WrapWithLink = ({ children, link, feature }) => (
  <> {link ? <Link to={feature}>{children}</Link> : <>{children}</>}</>
)
export default ({ feature, link }) => {
  const featureLocation = getfeatureLocation(feature)
  const featureLabel = getfeatureLabel(featureLocation)
  return (
    <WrapWithLink link={link} feature={feature}>
      <div data-tip={`Featured on ${featureLabel}`}>
        {getLogo(featureLocation)}
      </div>
    </WrapWithLink>
  )
}
