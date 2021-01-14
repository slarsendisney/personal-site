const crypto = require("crypto")
const { google } = require("googleapis")

exports.sourceNodes = async ({ actions, cache }, configOptions) => {
  const currentCache = await cache.get(`gatsby-source-google-analytics-reporting-api`);
  let data = {}
  if (currentCache) {
    console.log("🔥 Using cached data for analytics");
   let cache =  JSON.parse(currentCache)
   data = cache
  }
  else {
    console.log("🚀 Getting analytics")
    const { email, key, viewId, startDate } = configOptions
    const scopes = "https://www.googleapis.com/auth/analytics.readonly"
    const jwt = new google.auth.JWT(email, null, key, scopes)
    await jwt.authorize()
  
    //SITE WIDE STATS
   data.SiteWideStats = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + viewId,
      "start-date": startDate || "2009-01-01",
      "end-date": "today",
      metrics: "ga:pageviews, ga:sessions",
    })
  
    //Events
    data.Events = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + viewId,
      "start-date": startDate || "2009-01-01",
      "end-date": "today",
      dimensions: "ga:eventCategory, ga:eventLabel",
      metrics: "ga:totalEvents",
    })
  
      //VIEWS PER DATE
     data.viewsPerDate = await google.analytics("v3").data.ga.get({
        auth: jwt,
        ids: "ga:" + viewId,
        "start-date": "30daysAgo",
        "end-date": "today",
        dimensions: "ga:date",
        metrics: "ga:pageviews",
      })
  
     data.result = await google.analytics("v3").data.ga.get({
        auth: jwt,
        ids: "ga:" + viewId,
        "start-date": startDate || "2009-01-01",
        "end-date": "today",
        dimensions: "ga:pagePath",
        metrics: "ga:pageviews, ga:sessions",
        sort: "-ga:pageviews",
      })

      console.log("💾 Caching analytics data");
      return cache.set(
        `gatsby-source-google-analytics-reporting-api`,
        JSON.stringify(data)
      );
  }


  const { createNode } = actions

  for (let [pageViews, sessions] of data.SiteWideStats.data.rows) {
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
    })
  }
  for (let [eventCategory, eventLabel, totalEvents] of data.Events.data.rows) {
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
    })
  }

  for (let [date, views] of data.viewsPerDate.data.rows) {
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
    })
  }

  for (let [path, totalCount, sessions] of data.result.data.rows) {
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
    })
  }
}
