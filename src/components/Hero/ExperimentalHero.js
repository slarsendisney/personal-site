import React from "react"
import Man from "./man.png"
import Ribbon1 from "./ribbon1.png"
import Ribbon2 from "./ribbon2.png"
import Ribbon3 from "./ribbon3.png"
import Paperclip from "./paperclip.png"
import Screwdriver from "./screwdriver.png"
import Spring from "./spring.png"
import Coffee from "./coffee.png"
import Pen from "./pen.png"

export default () => {
  return (
    <div className="row">
      <div className="col-xs-12 flex align-horizontal align-vertical">
        <div
          class="hero-wrapper text-align-center"
          style={{ width: "100%", maxWidth: 900 }}
        >
          <div class="hero-box a">
            <img
              className="float-slow"
              src={Coffee}
              style={{ maxWidth: 45, width: "7vw", marginRight: "-240%" }}
            />
          </div>
          <div class="hero-box b"></div>
          <div class="hero-box c">
            <img
              src={Ribbon2}
              className="grow-lg "
              style={{ maxWidth: 50, width: "6vw", marginLeft: "-150%" }}
            />
          </div>
          <div class="hero-box d">
            <div className="row">
              <div className="col-xs-12">
                <img
                  src={Ribbon1}
                  className="grow-lg "
                  style={{ maxWidth: 60, width: "10vw", marginRight: "-100%" }}
                />
              </div>
              <div className="col-xs-12" style={{ marginTop: "80%" }}>
                <img
                  className="float-slow"
                  src={Paperclip}
                  style={{ maxWidth: 60, width: "8vw", marginRight: "-30%" }}
                />
              </div>
            </div>
          </div>
          <div class="hero-box e" style={{ position: "relative" }}>
            <img
              className="float"
              src={Man}
              style={{ maxWidth: 260, width: "100%", marginLeft: "-15%" }}
            />
          </div>
          <div class="hero-box f">
            <div className="row">
              <div className="col-xs-12" style={{ marginTop: "5%" }}>
                <img
                  className="float-slowest"
                  src={Spring}
                  style={{ maxWidth: 50, width: "5vw", marginLeft: "-50%" }}
                />
              </div>
              <div className="col-xs-12" style={{ marginTop: "50%" }}>
                <img
                  className="float-slow "
                  src={Pen}
                  style={{ maxWidth: 50, width: "8vw", marginLeft: "-50%" }}
                />
              </div>
            </div>
          </div>
          <div class="hero-box g">
            <img
              className="float-slowest"
              src={Screwdriver}
              style={{
                maxHeight: 60,
                height: "8vw",
                marginTop: "-50%",
                marginRight: "-100%",
              }}
            />
          </div>
          <div class="hero-box h" style={{ position: "relative" }}></div>
          <div class="hero-box i">
            <img
              src={Ribbon3}
              className="grow-lg "
              style={{
                maxWidth: 60,
                width: "8vw",
                marginTop: "-50%",
                marginLeft: "-90%",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="col-xs-12"
        style={{ textAlign: "center", marginTop: -20 }}
      >
        <h1 className="margin-0 is-grey is-hero-menu">Sam Larsen-Disney</h1>
        <p className="margin-0 is-grey">DESIGNER. ENGINEER. CREATOR.</p>
      </div>
    </div>
  )
}
