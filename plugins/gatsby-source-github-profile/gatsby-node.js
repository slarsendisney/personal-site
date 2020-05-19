const fetch = require("node-fetch")
const crypto = require("crypto")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions
  const headers = {
    Authorization: `bearer ${configOptions.token}`,
  }
  const body = {
    query: `query {
            user(login: "${configOptions.username}") {
              name
    contributionsCollection {
        contributionCalendar {
            totalContributions
         }
     }
    repository(name: "personal-site") {
      id
      createdAt
      url
      ref(qualifiedName: "master") {
            name
            target {
              ... on Commit {
                
                history(first: 0) {
                  totalCount
            }
          }
        }
      }
    }
            }
          }`,
  }
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  })
  const data = await response.json()

  const { contributionsCollection } = data.data.user
  const totalContributions =
    contributionsCollection.contributionCalendar.totalContributions
  const commits = data.data.user.repository.ref.target.history.totalCount
  createNode({
    totalContributions: Number(totalContributions),
    commitsOnRepo: Number(commits),
    id: "Github-Profile",
    internal: {
      type: `GitHubProfile`,
      mediaType: `text/plain`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify({ totalContributions, commits }))
        .digest(`hex`),
      description: `Github Profile Information`,
    },
  })
}
