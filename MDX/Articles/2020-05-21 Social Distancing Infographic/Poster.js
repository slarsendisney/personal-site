import React, { useState, useEffect } from "react";
import {
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  differenceInHours,
  differenceInBusinessDays,
} from "date-fns";
import { useGithubData } from "../../../src/utils/customHooks";
import films from "./films.json";
import Mars from "./mars.svg";
import Moon from "./moon.svg";
import Egg from "./egg.svg";
import Plane from "./plane.svg";
import Popcorn from "./popcorn.svg";
import Movie from "./movie.svg";
import CD from "./cd.svg";
import Beer from "./beer.svg";
import WFH from "./wfh.svg";
import Laptop from "./laptop.svg";
import Complete from "./complete.svg";
import Birthday from "./birthday.svg";
import Relationship from "./relationship.svg";
import Coffee from "./coffee.svg";
import Brain from "./brain.svg";
import Support from "./support.svg";
import Music from "./music.svg";
import Webcam from "./webcam.svg";
import France from "./france.svg";
const filmsOrders = films.sort();
const PROJECTCOUNT = 3;
const BIRTHDAYCOUNT = 3;

function twoDecimalPlacesIfCents(amount) {
  return amount % 1 !== 0 ? amount.toFixed(2) : amount;
}

const Poster = () => {
  const startDate = new Date(2020, 2, 16);
  const [endDate, setEndDate] = useState(Date.now());
  const { pandemicContributions } = useGithubData();

  useEffect(() => {
    const interval = setInterval(() => setEndDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const daysInLockDown = () => {
    return differenceInDays(endDate, startDate);
  };
  const bussinessdaysInLockDown = () => {
    return differenceInBusinessDays(endDate, startDate);
  };
  const hoursInLockDown = () => {
    return differenceInHours(endDate, startDate);
  };
  const minutesInLockDown = () => {
    return differenceInMinutes(endDate, startDate);
  };
  const secondsInLockDown = () => {
    return differenceInSeconds(endDate, startDate);
  };
  const timesToMoon = Math.floor(daysInLockDown() / 3);
  const percentageToMars = twoDecimalPlacesIfCents(
    (daysInLockDown() / (7 * 30)) * 100
  );
  const timeToCookEggs = Math.floor(minutesInLockDown() / 3.5);
  const watchTitanic = Math.floor(hoursInLockDown() / 3.5);
  const aroundTheWorld = twoDecimalPlacesIfCents(hoursInLockDown() / 45);
  const listenToQueen = Math.floor(minutesInLockDown() / 58);
  const daysWithoutCarlota = differenceInDays(
    new Date(2020, 5, 7),
    new Date(2020, 2, 1)
  );
  const coffeeDoses = Math.floor(daysInLockDown() * 1.7);
  const beer = Math.floor(daysInLockDown() / 3);
  const hoursListened = twoDecimalPlacesIfCents(daysInLockDown() * 4.21);
  const meetings = Math.floor(bussinessdaysInLockDown() * 3.2);

  return (
    <div className="is-white-bg-always is-grey-always pad-5 row pandemic-poster">
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-12 margin-5-t margin-3-b">
            <h4 className="margin-0">I HAVE BEEN SOCIAL DISTANCING FOR</h4>
          </div>
          <div className="col-xs-12  col-md-5 col-lg-4  flex align-vertical">
            <h1 className="margin-0 pad-0">{daysInLockDown()} Days</h1>
          </div>
          <div
            className="col-xs-12  col-md-7 col-lg-8 flex align-vertical"
            style={{ justifyContent: "center" }}
          >
            <p className="margin-0 pad-0" style={{ fontSize: 40 }}>
              Which is equivalent to <strong>{hoursInLockDown()} hours</strong>,{" "}
              <strong>{minutesInLockDown()} minutes</strong> or{" "}
              <strong>{secondsInLockDown()} seconds</strong>.
            </p>
          </div>
          <div className="col-xs-12">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-t ">
              <strong>THATS ENOUGH TIME TO...</strong>
            </h4>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Moon} className="poster-icon " />
            <h3 className="margin-2-l">
              Travel to the moon {timesToMoon} times.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Mars} className="poster-icon " />
            <h3 className="margin-2-l">
              Travel {percentageToMars}% of the way to mars.
            </h3>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Plane} className="poster-icon " />
            <h3 className="margin-2-l">
              Fly around the world {aroundTheWorld} times.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Egg} className="poster-icon " />
            <h3 className="margin-2-l">
              Boil {timeToCookEggs} eggs to perfection.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Movie} className="poster-icon " />
            <h3 className="margin-2-l">
              Watch &quot;Titanic&quot; {watchTitanic} times.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={CD} className="poster-icon " />
            <h3 className="margin-2-l">
              Listen to &quot;Queen&apos;s Greatest Hits&quot; {listenToQueen}{" "}
              times.
            </h3>
          </div>
          <div className="col-xs-12">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-t  ">
              <strong>I&apos;VE HAD TO TRY NEW THINGS...</strong>
            </h4>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Relationship} className="poster-icon " />
            <h3 className="margin-2-l">
              Gone long distance for {daysWithoutCarlota} days.
            </h3>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={WFH} className="poster-icon " />
            <h3 className="margin-2-l">
              Worked from home {bussinessdaysInLockDown()} Days.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Webcam} className="poster-icon " />
            <h3 className="margin-2-l">Been in {meetings} virtual meetings.</h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Support} className="poster-icon " />
            <h3 className="margin-2-l">
              Built 1 rapid response support system for my community.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={France} className="poster-icon " />
            <h3 className="margin-2-l">1 trip abroad cancelled.</h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Birthday} className="poster-icon " />
            <h3 className="margin-2-l">
              Celebrated {BIRTHDAYCOUNT} family birthdays remotely.
            </h3>
          </div>
          <div className="col-xs-12">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-t  ">
              <strong>BUT ALSO DONE MORE OF THE THINGS I LOVE...</strong>
            </h4>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Laptop} className="poster-icon " />
            <h3 className="margin-2-l">
              Commited code {pandemicContributions} times to open-source
              projects.*
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Complete} className="poster-icon " />
            <h3 className="margin-2-l">
              Seen {PROJECTCOUNT} projects from idea to completion.
            </h3>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Brain} className="poster-icon " />
            <h3 className="margin-2-l">Learnt 2 new programming languages.</h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Music} className="poster-icon " />
            <h3 className="margin-2-l">
              Listened to {hoursListened} hours of music.
            </h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Beer} className="poster-icon " />
            <h3 className="margin-2-l">Consumed {beer} beers.</h3>
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 flex align-horizontal margin-5-t"
            style={{ alignItems: "center" }}
          >
            <img src={Coffee} className="poster-icon " />
            <h3 className="margin-2-l">
              Consumed {coffeeDoses} doses of caffeine.
            </h3>
          </div>
          <div className="col-xs-12">
            <div
              className="line margin-5-tb opacity-5"
              style={{ width: "100%", maxWidth: "100vw" }}
            />
            <h4 className="margin-0 margin-1-t margin-3-b  ">
              <strong>AND RESEARCHED PLENTY OF POP-CULTURE...</strong>
            </h4>
          </div>

          {filmsOrders.map((film) => (
            <div className="col-xs-4 col-sm-3 col-md-2" key={film}>
              <p className="legal margin-1-tb">{film}</p>
            </div>
          ))}
        </div>
        <div className="col-xs-12 text-align-center margin-5-t margin-3-b">
          <img src={Popcorn} className="poster-icon " />
        </div>
        <div className="col-xs-12 text-align-center margin-5-tb">
          <p className="margin-2-b">Stay safe everybody and see you soon!</p>
          <p className="legal">
            *Code stats are refreshed daily at 9PM GMT. Stats account for public
            projects only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poster;
