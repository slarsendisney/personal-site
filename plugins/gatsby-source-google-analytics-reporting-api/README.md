# Gatsby source for Google Anatytics Reporting API

## Install

```
npm i gatsby-source-google-analytics-reporting-api
```

## Configure

In `gatsby-config.js`:

```js
    {
      resolve: `gatsby-source-google-analytics-reporting-api`,
      options: {
        email: process.env.CLIENT_EMAIL,
        key: require('fs').readFileSync('private.key'),
        viewId: `115350264`,
        startDate: `2009-01-01`,
      }
    },
```

## Usage 

```graphql
    pageViews(path: {eq: $slug}) {
      totalCount
    }
```

## License

MIT
