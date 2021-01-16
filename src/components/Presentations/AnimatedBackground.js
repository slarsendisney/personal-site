import React from "react"
import Particles from "react-particles-js"
import { Helmet } from "react-helmet-async"

export default () => {
  return (
    <>
      <Helmet>
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
      </Helmet>
      <Particles
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
        }}
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            color: "#6292da",
            size: {
              value: 10,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    </>
  )
}
