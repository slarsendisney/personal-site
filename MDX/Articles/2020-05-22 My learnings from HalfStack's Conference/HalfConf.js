import React from "react";
import NetworkStrength from "./NetworkStrength";
import Computer from "./computer.svg";
import Future from "./future.svg";
import BlackHole from "./black-hole.svg";
import Camera from "./camera.svg";
import Dance from "./dance.svg";
import Baby from "./baby.svg";
import Win from "./win.svg";
import Glasses from "./glasses.svg";
import Astron from "./astronaut.svg";
import Coding from "./coding.svg";
import Sickness from "./motionsickness.svg";
import Solid from "./solid.svg";
import Phone from "./phone.svg";
import Constellation from "./constellation.svg";
import Culture from "./culture.svg";
import Graph from "./graph.svg";
import Integer from "./integer.svg";
import Book from "./book.svg";
import IntlDemo from "./IntlDemo";

const Poster = () => {
  return (
    <div className="my-2 legacy bg-white is-grey-always pad-5 row pandemic-poster">
      <div className="col-xs-12">
        {/* ------------------     Building Motion Controlled Web Applications       ------------------*/}
        <div className="row">
          <div className="col-xs-12 margin-5-t margin-3-b">
            <h4 className="margin-0">LEARNINGS FROM HALFSTACK CONF 2020</h4>
          </div>
          <div className="col-xs-12  flex align-vertical">
            <h2 className="margin-0 pad-0" style={{ fontSize: 35 }}>
              Building Motion Controlled Web Applications
            </h2>
          </div>

          <div className="col-xs-12 margin-5-b">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-tb ">
              <strong>
                Charlie Gerard - Senior (Front-End Engineer at Netlify)
              </strong>{" "}
              gave an awesome talk on how we can use some great new HCI devices
              like the &quot;Myo Armband&quot; to change the way we interact
              with our browsers.
            </h4>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3  margin-5-b flex">
            <img src={Computer} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>Common HCI</strong>
              </h3>
              <div className="row">
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Keyboards</li>
                    <li>Touch</li>
                  </ul>
                </div>
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Swipe</li>
                    <li>Voice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3  margin-5-b flex ">
            <img src={Future} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>Incoming HCI</strong>
              </h3>
              <div className="row">
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Gyroscope</li>
                    <li>Leap Motion</li>
                  </ul>
                </div>
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Myo Armband</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6  margin-5-b flex ">
            <img src={Camera} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>JS Camera Libraries</strong>
              </h3>
              <p className="margin-2-l margin-0">
                There are a crazy number of JS libraries that make use of a
                webcam. If you&apos;re working in ReactJS theres an awesome npm
                package called &quot;react-webcam&quot; thats great for getting
                started. We explored some libraries that can make use of webcam
                data in detail below.
              </p>
            </div>
          </div>
          <div className="col-xs-12 margin-5-b flex ">
            <img src={Baby} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">Face Mesh</h2>
              <p className="margin-2-l margin-0-tb">
                Uses key-points to get X,Y and Z axis. Uses a model to make
                predictions on the video source about the presence of the face. 
                Returns a list of different parts of the face, bounding box of
                the face and mesh data. (Lots of arrays!)  Built POC app called
                face-scroll that allows you to scroll up and down the page using
                your head
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 margin-5-b flex ">
            <img src={Dance} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">PoseNet</h2>
              <p className="margin-2-l margin-0-tb">
                Pose detection. recognises body shapes. Pulls in video feed from
                client - can disable audio. Uses a detect function to guess pose
                based off of identified body shapes. Has a confidence threshold 
                Made beatsaber clone in the browser.
              </p>
            </div>
          </div>

          <div className="col-xs-12 col-md-6 margin-5-b flex ">
            <img src={Win} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">Hand Pose</h2>
              <p className="margin-2-l margin-0-tb">
                Hands only! Recognises key-points of the hand and has Z axis.
                Can recognise when fingers are folded. Syntax is similar to
                PoseNet.
              </p>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-b flex"
            style={{ alignItems: "center" }}
          >
            <img src={Glasses} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">
                Putting It Into Practise
              </h2>
              <p className="margin-0 margin-2-l">
                I integrated pose recognition into my site&apos;s presentation
                clicker to create touch free slide navigation for presenters
                using just their gestures. This prototype is built using
                socket.io, posenet and one of my Gatsbyjs boilerplates which you
                can find{" "}
                <a className="is-special-blue-always" href="/boilerplates">
                  here
                </a>
                .
              </p>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-b flex"
            style={{ alignItems: "center" }}
          >
            <iframe
              width="100%"
              height="300px"
              className="border-radius"
              style={{ maxHeight: 200 }}
              src="https://www.youtube.com/embed/kZkOyVuBw-o"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div
            className="col-xs-12 col-md-6 flex"
            style={{ flexDirection: "column" }}
          >
            <h2 className="margin-1-tb">Limitations</h2>
            <ul className="margin-1-t">
              <li>
                <p className="margin-1-t">
                  {" "}
                  <strong>All of this is super new </strong>- Google released in
                  last couple of months so we should see more improvements in
                  coming years. Max frame rate is 40fps right now. Smooth
                  animations are normally around 60fps.
                </p>
              </li>
              <li>
                <p className="margin-1-t">
                  <strong>Its Heavy</strong> - Library is around 12mb for
                  handpose. This of course, affects site performance.
                </p>
              </li>
              <li>
                <p className="margin-1-t">
                  <strong>Accuracy</strong> - Laptop webcams and not depth
                  cameras and may not be super accurate. Lighting is super
                  important to improve accuracy.
                </p>
              </li>
              <li>
                <p className="margin-1-t">
                  <strong>Privacy</strong> - Constantly tracking the user while
                  recording video - concerns over privacy need to be considered.
                </p>
              </li>
              <li>
                <p className="margin-1-t">
                  <strong>UX</strong> - This is a new way to interact with the
                  web and as such would need to be learned - but people would be
                  excited and would probably adopt quickly.
                </p>
              </li>
            </ul>
          </div>

          <div
            className="col-xs-12 col-md-6 flex"
            style={{ flexDirection: "column" }}
          >
            <h2 className="margin-1-tb">Key Takeaways</h2>
            <ul className="margin-1-t">
              <li>
                <h4 className="margin-0">
                  <strong>
                    These tools are really useful to help improve the
                    accessibility of the web.
                  </strong>
                </h4>
                <p className="margin-1-t">
                  We could in the future have a &quot;motion-mode&quot; like
                  &quot;dark-mode&quot; on our websites. This could be a toggle
                  feature that when on allows the user to navigate a website
                  with any pose, gesture, facial expression.
                </p>
              </li>
              <li>
                <h4 className="margin-0">
                  <strong>
                    We could use it to improve our health and fitness.
                  </strong>
                </h4>
                <p className="margin-1-t">
                  We could create websites that encourage us to exercise or help
                  us improve out yoga positions.
                </p>
              </li>
              <li>
                <h4 className="margin-0">
                  <strong>We could use it beyond the browser</strong>
                </h4>
                <p className="margin-1-t">
                  JS is not just for websites in the browser but also the
                  internet of things. Imagine the possibilities?
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xs-12 text-align-center margin-5-t margin-3-b">
          <p className="">
            <strong>
              &quot;HCI is broad so start small - focus on one piece of the
              puzzle. Use one library or device and have fun!&quot;
            </strong>
          </p>
          <img src={Astron} className="poster-icon " />
        </div>
        {/* ------------------     Responsive Design in 2020       ------------------*/}
        <div className="row">
          <div className="col-xs-12  flex align-vertical">
            <h2 className="margin-0 pad-0" style={{ fontSize: 35 }}>
              Responsive Design in 2020
            </h2>
          </div>

          <div className="col-xs-12 margin-5-b">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-tb ">
              <strong>Kilian Valkhof (Makes Polypane)</strong> gave a talk on
              the history of responsive design and whats coming up in the future
              with media queries.
            </h4>
          </div>

          <div className="col-xs-12 col-sm-6 margin-5-b flex ">
            <img src={Coding} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>Responsive Design</strong>
              </h3>
              <p className="margin-2-l margin-1-tb">
                The way a website adapts to different screen-sizes by reflowing
                and repositioning content as the available space allows.
                Responsive design means:
              </p>
              <div className="row">
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Mobile first</li>
                    <li>Media queries width in ems</li>
                    <li>Base font size</li>
                  </ul>
                </div>
                <div className="col-xs-6 col-sm-12">
                  <ul className="margin-0">
                    <li>Allow resizing</li>
                    <li>Scrolling is fine - no fold</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 margin-5-b ">
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-0-tb">
                <strong>Cheap Dark Mode</strong>
              </h3>
              <pre
                className="is-grey-bg is-white pad-3 border-radius"
                style={{ width: "100%" }}
              >
                {`@media (prefers-color-scheme: dark) {
  :root {
    background: #111;
    filter: invert(1) hue-rotate(180deg);
  }
  img, video {
    filter: invert(1) hue-rotate(180deg);
  }
}`}
              </pre>
            </div>
          </div>
          <div className="col-xs-12 col-md-6  margin-5-b flex">
            <img src={Sickness} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>prefers-reduced-motion</strong>
              </h3>
              <p className="margin-2-l margin-1-tb">
                Users can indicate they want to see less happening on the
                screen. Reasons they may want to do this may include motion
                sickness or maybe they don&apos;t want to wait for your
                animations to finish. This doesnt mean you can&apos;t use any
                motion, just be mindful.
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6  margin-5-b flex">
            <img src={Solid} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>prefers-reduced-transparency</strong>
              </h3>
              <p className="margin-2-l margin-1-tb">
                Users can indicate they want to see things on solid colours.
                Reasons they may want to do this may include visual impairments
                but it can also help people who struggle to focus. This feature
                is not yet widely supported.
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6  margin-5-b flex">
            <img src={Phone} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-2-l margin-0-tb">
                <strong>Network conditions: navigator.connection</strong>
              </h3>
              <p className="margin-2-l margin-1-tb">
                We can use navigator.connection to determine whether a user
                would like to save their mobile data but also their effective
                network conncetion speed. You can see a simplified version of
                how this might work next to this!
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 margin-5-b ">
            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-0-tb">
                <strong>Testing Network Conditions</strong>
              </h3>
              <pre
                className="is-grey-bg is-white pad-3 border-radius"
                style={{ width: "100%" }}
              >
                <code>
                  {`if(navigator.connection.saveData 
|| navigator.connection.effectiveType 
=='slow-2g') {
 preloadVide = false;
}`}
                </code>
              </pre>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-tb flex"
            style={{ alignItems: "center" }}
          >
            <img src={Glasses} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">
                Putting It Into Practise
              </h2>
              <p className="margin-0 margin-2-l">
                The div next to this section has been set up using a media query
                to ensure that it always sticks to the users dark-mode
                preferance. You can use the dark-mode toggle at the top of the
                screen to switch it. It also detects network connection
                strength.
              </p>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-tb"
            style={{ alignItems: "center" }}
          >
            <NetworkStrength />
          </div>
        </div>
        <div className="col-xs-12 text-align-center margin-5-t margin-3-b">
          <img src={Constellation} className="poster-icon " />
        </div>
        <div className="col-xs-12 text-align-center margin-5-tb">
          <p className="legal">Onto the next one!</p>
        </div>
        <div className="row">
          <div className="col-xs-12  flex align-vertical">
            <h2 className="margin-0 pad-0" style={{ fontSize: 35 }}>
              Internationalisation and Data Visulisation
            </h2>
          </div>
          <div className="col-xs-12 margin-5-b">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-tb ">
              <strong>Naomi Meyer (SDE at Adobe)</strong> gave a cool talk on
              internationalisation and data visulisation in a COVID world!
            </h4>
          </div>
          <div className="col-xs-12 margin-5-b text-align-center">
            <h2 className="margin-0 is-special-blue-always">
              &quot;Data visulisations are powerful international communication
              tools to effectively communicate a storyand share critical
              information across the world.&quot;
            </h2>
          </div>
          <div
            className="col-xs-12 col-md-6 flex"
            style={{ flexDirection: "column" }}
          >
            <div className="flex align-horizontal">
              <img src={Graph} className="poster-icon" />
              <h2 className="margin-1-tb margin-2-l">
                Formatting a graph for the world:
              </h2>
            </div>
            <ul className="margin-1-t">
              <li>
                <h4 className="margin-0">
                  <strong>
                    Format integers correctly across each distinct local
                  </strong>
                </h4>
                <p className="margin-1-t">
                  Different locals can have different formats for displaying
                  numbers correctly.
                </p>
              </li>
              <li>
                <h4 className="margin-0">
                  <strong>Think about colours</strong>
                </h4>
                <p className="margin-1-t">
                  Different colours can have different cultural and regional
                  signifigance so keep it in mind!
                </p>
              </li>
              <li>
                <h4 className="margin-0">
                  <strong>Dates and Times</strong>
                </h4>
                <p className="margin-1-t">
                  Dates are often overlooked when formatting.
                </p>
              </li>
              <li>
                <h4 className="margin-0">
                  <strong>Don&apos;t assume left to right</strong>
                </h4>
                <p className="margin-1-t">
                  There are many countries out there where people read right to
                  left and its important to consider this when looking at these
                  locales.
                </p>
              </li>
            </ul>
          </div>
          <div
            className="col-xs-12 col-md-6 flex"
            style={{ flexDirection: "column" }}
          >
            <div className="flex align-horizontal">
              <img src={Culture} className="poster-icon" />
              <h2 className="margin-1-tb  margin-2-l">Culture</h2>
            </div>
            <p className="margin-1-tb">
              Culture is deeply rooted in our thinking patterns. Culture can
              effect how are uses interact and benefit from digital experiences.
              Internationalisation goes beyond language. By acknowledging
              cultural and social differences we&apos;re creating with
              innovation.
            </p>
            <p>
              Touch screens were intially built for accessibility but now we are
              all reaping the benefits.
            </p>

            <div className="flex " style={{ flexDirection: "column" }}>
              <h3 className="margin-0-tb">
                <strong>Reusable Formatter Instance</strong>
              </h3>
              <pre
                className="is-grey-bg is-white pad-3 border-radius"
                style={{ width: "100%" }}
              >
                {`const reusableFormatterInstance  = (locale, number) => {
  return new Intl.NumberFormat(locale).format(number);
};

reusableFormatterInstance('en', 123456789123456789);`}
              </pre>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 ">
            <div className="flex align-horizontal">
              <img src={Integer} className="poster-icon" />

              <h2 className="margin-1-tb  margin-2-l">Integers</h2>
            </div>
            <div className="flex " style={{ flexDirection: "column" }}>
              <p className="margin-0-tb">
                Integers are not the same across the world!
              </p>
              <pre className="is-grey-bg is-white pad-3 border-radius">
                {`English --> 123,457 | Tamil --> 1,23,457`}
              </pre>
            </div>
          </div>

          <div
            className="col-xs-12 col-md-6 "
            style={{ flexDirection: "column" }}
          >
            <div className="flex align-horizontal">
              <img src={Book} className="poster-icon" />

              <h2 className="margin-1-tb  margin-2-l">Further Reading</h2>
            </div>
            <ul className="margin-1-t">
              <li>
                <a
                  className="is-special-blue-always"
                  href="https://formatjs.io/"
                >
                  <h4 className="margin-0 margin-1-b">react-intl</h4>
                </a>
              </li>
              <li>
                <a
                  className="is-special-blue-always"
                  href="https://react.i18next.com/"
                >
                  <h4 className="margin-0 margin-1-b">react-i18next</h4>
                </a>
              </li>
              <li>
                <a
                  className="is-special-blue-always"
                  href="https://github.com/facebook/fbt"
                >
                  <h4 className="margin-0 margin-1-b">fbt</h4>
                </a>
              </li>
              <li>
                <a
                  className="is-special-blue-always"
                  href="https://momentjs.com/"
                >
                  <h4 className="margin-0 margin-1-b">moment</h4>
                </a>
              </li>
            </ul>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-tb flex"
            style={{ alignItems: "center" }}
          >
            <img src={Glasses} className="poster-icon " />
            <div className="flex " style={{ flexDirection: "column" }}>
              <h2 className="margin-2-l margin-0-tb">
                Putting It Into Practise
              </h2>
              <p className="margin-0 margin-2-l">
                The div next to this section contains a demo of using
                internationalisation to format a string based on various
                locales. It uses compact notation to ensure it will fit the
                space.
              </p>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-6 margin-5-tb"
            style={{ alignItems: "center" }}
          >
            <IntlDemo />
          </div>
        </div>

        <div className="col-xs-12 text-align-center margin-5-t margin-3-b">
          <img src={BlackHole} className="poster-icon " />
        </div>
        <div className="col-xs-12 text-align-center margin-5-tb">
          {/* <p className="legal">That's it folks!</p> */}
        </div>
      </div>
    </div>
  );
};

export default Poster;
