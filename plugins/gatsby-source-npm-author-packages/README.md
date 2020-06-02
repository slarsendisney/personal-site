# Gatsby source for NPM Packages by an Author

This plugin utilises "libnpmsearch" to find packages on NPM created by a paticular author.

## Install

```
npm i gatsby-source-npm-author-packages
```

## Configure

In `gatsby-config.js`:

```js
    {
      resolve: `gatsby-source-gatsby-source-npm-author-packages`,
      options: {
        author: `npm-author-username`,
      }
    },
```

## Usage 

```graphql
  npmProfile {
    totalPackages
  }
  allNpmPackage {
    nodes {
      version
      name
      links {
        bugs
        homepage
        npm
        repository
      }
      keywords
      description
    }
  }
```

## License

MIT
