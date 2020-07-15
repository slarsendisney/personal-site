import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import useDarkMode from "use-dark-mode"
import CrossfadeImage from "react-crossfade-image"

const images = {
  Ribbon1:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%201.png?alt=media&token=81396fad-3e5a-4a93-bc64-404d1bc29d09",
  Ribbon1Dark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%201-Dark.png?alt=media&token=71fae2ad-b79b-4a21-8ca5-3a76d4240f9e",
  Bulb:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FBulb.png?alt=media&token=168d9de5-3de6-4fdf-a917-85984fca4ce3",
  Pencil:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FPencil.png?alt=media&token=13709f6c-628d-4f29-86ae-5c06dcb4d316",
  Macbook:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FMacbook.png?alt=media&token=1f97e289-7edf-498c-a632-83915a86ef3a",
  MacbookDark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FMacbook-Dark.png?alt=media&token=549ed1ca-ab1a-41e5-a72b-15bec5fad8dc",
  iPad:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FiPad.png?alt=media&token=93504aba-9208-473d-9229-9bd04403cbfe",
  Paperclip:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FPaperclip.png?alt=media&token=77f5f049-8880-4bca-ae28-a1e19648ed8d",
  Ribbon2:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%202.png?alt=media&token=4f2f66c3-ed4a-42e8-a504-453204cc1a8e",
  BodyThinking:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FThinking.png?alt=media&token=3be1ad9a-5c4d-45ab-beba-a3edf5ae88ec",
  Ribbon3:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%203.png?alt=media&token=ddf917fd-f4fb-4c0c-ba18-a3648cdb9898",
  Ribbon4:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%204.png?alt=media&token=f372908d-46c8-4161-9284-32358a1e762e",
  Ribbon10:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%2010.png?alt=media&token=5c3515f3-40a6-4272-956f-261e6fc0487c",
  Ribbon10Dark:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%2010-Dark.png?alt=media&token=1cad0a95-ae9a-44f3-99c3-36c32646fa2c",
  Ribbon11:
    "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/secrets%2FRibbon%2011.png?alt=media&token=3ee2393f-8e10-432c-bb7f-79146d33ff5c",
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
