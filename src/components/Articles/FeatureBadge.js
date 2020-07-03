import React from "react"
import useDarkMode from "use-dark-mode"
import GatsbyMonogram from "../../images/GatsbyMonogram.svg"
import DesignRant from "../../images/designrant/icon.svg"
import DesignRantDark from "../../images/designrant/icon-dark.svg"
import { Link } from "gatsby"

const getLogo = (featureLocation, darkMode) => {
  const style = { width: 40, height: 40 }
  switch (featureLocation) {
    case "gatsby":
      return <img src={GatsbyMonogram} style={style} />
    case "designrant":
      return darkMode ? (
        <img src={DesignRantDark} style={style} />
      ) : (
        <img src={DesignRant} style={style} />
      )
    default:
      return <div />
  }
}
const getfeatureLocation = (feature) => {
  if (feature.includes("gatsby")) {
    return "gatsby"
  }
  if (feature.includes("designrant")) {
    return "designrant"
  }
}

const getfeatureLabel = (featureLocation) => {
  switch (featureLocation) {
    case "gatsby":
      return "the GatsbyJS Blog"
    case "designrant":
      return "DesignRant.app"
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
  const darkMode = useDarkMode(false)
  return (
    <WrapWithLink link={link} feature={feature}>
      <div data-tip={`Featured on ${featureLabel}`}>
        {getLogo(featureLocation, darkMode.value)}
      </div>
    </WrapWithLink>
  )
}
