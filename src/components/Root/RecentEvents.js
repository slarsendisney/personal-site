import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const recentEvents = [
  {
    eventName: "ICHack20",
    location: "Imperial College | London",
    imgClass: "slide-image-one",
  },
  {
    eventName: "Hack Kings",
    location: "Vodafone Headquarters | London",
    imgClass: "slide-image-two",
  },
  {
    eventName: "Graduate Onboarding",
    location: "American Express | Brighton",
    imgClass: "slide-image-three",
  },
]
export default () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: false,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div style={{ width: "100%" }} className="margin-5-t">
      <Slider {...settings}>
        {recentEvents.map((item) => {
          return (
            <div key={`${item.eventName}outer`}>
              <div
                key={`${item.eventName}inner`}
                className={`margin-3-l margin-3-r  pad-5 ${item.imgClass}`}
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: 400,
                  position: "relative",
                }}
              >
                <div
                  className="is-black-always is-white-bg-always pad-1"
                  style={{
                    position: "absolute",
                    bottom: 25,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <h2 className="margin-0 margin-1-b">{item.eventName}</h2>
                  <p className="margin-0">{item.location}</p>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
