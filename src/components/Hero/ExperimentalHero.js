import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import useDarkMode from "use-dark-mode"
import CrossfadeImage from "react-crossfade-image"

const images = {
  Ribbon1:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%201.png?alt=media&token=2236894b-8dc5-49ec-960b-3a5635ada36b",
  Ribbon1Dark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%201-Dark.png?alt=media&token=a51c995f-f07e-4665-a50b-eb66380f4b99",
  Bulb:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FBulb.png?alt=media&token=b62b73c5-e554-491e-9a0e-e0d9ecc866ba",
  Pencil:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FPencil.png?alt=media&token=aebb1d5d-1162-4956-9ae0-e3729aab3204",
  Macbook:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FMacbook.png?alt=media&token=d0665372-3c4e-474d-aba0-68d61747ff41",
  MacbookDark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FMacbook-Dark.png?alt=media&token=041b569f-5010-477f-8b4f-da00389a8eab",
  iPad:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FiPad.png?alt=media&token=dafb4497-8575-4156-b6b7-6ca3c4c89ff7",
  Paperclip:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FPaperclip.png?alt=media&token=b87337ab-cb4a-4cf6-b7b0-08fe8d327d41",
  Ribbon2:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%202.png?alt=media&token=b22b72d7-8718-4d07-bebd-90e47d4299e6",
  BodyThinking:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FBody%2FThinking.png?alt=media&token=7e3e2447-437b-4c9e-9b91-779464e5613f",
  Ribbon3:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%203.png?alt=media&token=27579ff8-7918-46a0-b35a-c37a1319f474",
  Ribbon4:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%204.png?alt=media&token=d2bbe58d-a4cb-46d3-94a2-50c38442e9b2",
  Ribbon10:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%2010.png?alt=media&token=9c5d55b1-583a-4e34-94b0-f214e1f4f0a1",
  Ribbon10Dark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%2010-Dark.png?alt=media&token=2a684b89-5c10-4b6d-907c-a878fe4c6e49",
  Ribbon11:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/illustrations%2FItem%2FRibbon%2011.png?alt=media&token=1fee07c8-1cdb-4cf6-aa5c-8df55ac93e45",
}

export default ({ currentJob }) => {
  const darkMode = useDarkMode(false)
  return (
    <>
      <div className="row" style={{ paddingRight: "3%", position: "relative" }}>
        <div className="col-xs-12 pad-5-t margin-3-t">
          <div
            class="outer-wrapper text-align-center pad-10-t"
            style={{ width: "100%", maxWidth: 1300 }}
          >
            <div class="outer-wrapper-box a" style={{ marginRight: "-5%" }}>
              {/* LEFT SIDE */}
              <div
                className="row"
                style={{ maxWidth: 200, marginLeft: "auto" }}
              >
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={darkMode.value ? images.Ribbon1Dark : images.Ribbon1}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 45,
                      width: "30%",
                      marginLeft: "auto",
                      marginRight: "-80%",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={images.Pencil}
                    containerClass="float-x"
                    style={{
                      maxWidth: 70,
                      marginTop: "5%",
                      marginRight: "10%",
                      width: "40%",
                      marginLeft: "auto",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={images.Ribbon2}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 45,
                      marginTop: "5%",
                      width: "30%",
                      marginLeft: "25%",
                      transform: "rotate(-90deg)",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <div className="float-y-slow">
                    <CrossfadeImage
                      src={darkMode.value ? images.MacbookDark : images.Macbook}
                      style={{
                        maxWidth: 125,
                        marginTop: "5%",
                        marginBottom: "5%",
                        width: "80%",
                        marginLeft: "35%",
                      }}
                    />
                  </div>
                </div>
                <div className="col-xs-12 pad-1-t">
                  <CrossfadeImage
                    src={images.Ribbon11}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 65,
                      marginTop: "15%",
                      width: "50%",
                      marginLeft: "75%",
                      transform: "scaleX(-1) scaleY(-1)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              class="outer-wrapper-box b flex align-horizontal align-vertical"
              style={{ position: "relative" }}
            >
              {/* MAIN CHARACTER */}
              <div
                style={{
                  position: "relative",
                  top: -70,
                  left: 1,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 40,
                    right: 20,
                    margin: "auto",
                  }}
                  className="float-y"
                >
                  <div
                    className={`${
                      darkMode.value ? "bulb-glow flicker-in-1" : ""
                    } bulb`}
                    style={{
                      position: "absolute",
                      left: 30,
                      top: 20,
                    }}
                  />
                  <img
                    className={` bulb ${darkMode.value ? "flicker-in-1" : ""}`}
                    src={images.Bulb}
                    style={{
                      position: "absolute",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <CrossfadeImage
                src={images.BodyThinking}
                style={{
                  position: "relative",
                  maxWidth: 200,
                  left: "10%",
                  margin: "auto",
                  width: "100%",
                }}
              />
            </div>
            <div class="outer-wrapper-box c" style={{ marginLeft: "-5%" }}>
              {/* RIGHT SIDE */}
              <div
                className="row"
                style={{ maxWidth: 200, marginRight: "auto" }}
              >
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={images.Ribbon11}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 65,
                      width: "45%",
                      marginRight: "auto",
                      marginLeft: "-45%",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={images.Paperclip}
                    containerClass="float-x"
                    style={{
                      maxWidth: 90,
                      marginTop: "15%",
                      marginBottom: "15%",
                      marginLeft: "10%",
                      width: "60%",
                      marginRight: "auto",
                    }}
                  />
                </div>
                <div className="col-xs-12 pad-1-t">
                  <CrossfadeImage
                    src={images.Ribbon4}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 70,
                      marginTop: "5%",
                      width: "50%",
                      marginLeft: "20%",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={images.iPad}
                    containerClass="float-x-slow"
                    style={{
                      maxWidth: 75,
                      marginTop: "15%",
                      marginBottom: "15%",
                      width: "50%",
                      marginLeft: "-5%",
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <CrossfadeImage
                    src={darkMode.value ? images.Ribbon10Dark : images.Ribbon10}
                    containerClass="grow-lg"
                    style={{
                      maxWidth: 60,
                      width: "40%",
                      marginLeft: "-20%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 flex align-horizontal align-vertical text-align-center">
          <h1 className="margin-0-t margin-1-b is-hero-menu ">
            Sam Larsen-Disney
          </h1>
          <h3 className="margin-0  is-hero-sub-text tracking-in-contract">
            DESIGNER | ENGINEER | CREATOR
          </h3>
          <AnchorLink href="#articles">
            <h1 className="is-grey grow-lg margin-0-b margin-1-t link">
              <i class="las la-angle-down"></i>
            </h1>
          </AnchorLink>
        </div>
      </div>
    </>
  )
}
