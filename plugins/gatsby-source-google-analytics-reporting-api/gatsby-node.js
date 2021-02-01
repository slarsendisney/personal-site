const crypto = require("crypto");
const { google } = require("googleapis");

const naughtyBotPaths = ["/bot-traffic.xyz"];

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions;
  const { email, key, viewId, startDate } = configOptions;
  const scopes = "https://www.googleapis.com/auth/analytics.readonly";
  const jwt = new google.auth.JWT(email, null, key, scopes);
  await jwt.authorize();

  //SITE WIDE STATS
  const SiteWideStats = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + viewId,
    "start-date": startDate || "2009-01-01",
    "end-date": "today",
    metrics: "ga:pageviews, ga:sessions",
  });
  for (let [pageViews, sessions] of SiteWideStats.data.rows) {
    createNode({
      pageViews: Number(pageViews),
      sessions: Number(sessions),
      id: "All-site",
      internal: {
        type: `SiteWideStats`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ pageViews, sessions }))
          .digest(`hex`),
        mediaType: `text/plain`,
        description: `Page views & sessions for the site`,
      },
    });
  }

  //Events
  const Events = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + viewId,
    "start-date": startDate || "2009-01-01",
    "end-date": "today",
    dimensions: "ga:eventCategory, ga:eventLabel",
    metrics: "ga:totalEvents",
  });
  for (let [eventCategory, eventLabel, totalEvents] of Events.data.rows) {
    createNode({
      eventCategory,
      eventLabel,
      totalEvents,
      id: eventCategory + eventLabel,
      internal: {
        type: `SiteEvents`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ eventCategory, eventLabel, totalEvents }))
          .digest(`hex`),
        mediaType: `text/plain`,
        description: `Events for this site`,
      },
    });
  }

  //VIEWS PER DATE
  const viewsPerDate = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + viewId,
    "start-date": "30daysAgo",
    "end-date": "today",
    dimensions: "ga:date",
    metrics: "ga:pageviews",
  });

  for (let [date, views] of viewsPerDate.data.rows) {
    createNode({
      date: String(date),
      views: Number(views),
      id: date,
      internal: {
        type: `ViewsPerDate`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ date, views }))
          .digest(`hex`),
        mediaType: `text/plain`,
        description: `Page views & sessions for the site`,
      },
    });
  }

  const result = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + viewId,
    "start-date": startDate || "2009-01-01",
    "end-date": "today",
    dimensions: "ga:pagePath",
    metrics: "ga:pageviews, ga:sessions",
    sort: "-ga:pageviews",
  });

  for (let [path, totalCount, sessions] of result.data.rows) {
    if (!naughtyBotPaths.includes(path)) {
      createNode({
        path,
        totalCount: Number(totalCount),
        sessions: Number(sessions),
        id: path,
        internal: {
          type: `PageViews`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify({ path, totalCount }))
            .digest(`hex`),
          mediaType: `text/plain`,
          description: `Page views per path`,
        },
      });
    }
  }
};
