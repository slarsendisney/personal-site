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
    pandemicContributions: contributionsCollection(from: "2020-03-16T00:00:00Z") {
      contributionCalendar {
        totalContributions
      }
    }
    repository(name: "personal-site") {
      id
      createdAt
      url
      forkCount
      stargazers {
        totalCount
      }
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
  // console.log(data) 
  const { contributionsCollection, pandemicContributions } = data.data.user
  const totalContributions =
    contributionsCollection.contributionCalendar.totalContributions
  const pandemicPosterContributions =
    pandemicContributions.contributionCalendar.totalContributions
  const commits = data.data.user.repository.ref.target.history.totalCount
  const { forkCount } = data.data.user.repository
  const stars = data.data.user.repository.stargazers.totalCount
  createNode({
    totalContributions: Number(totalContributions),
    commitsOnRepo: Number(commits),
    forks: Number(forkCount),
    stars: Number(stars),
    pandemicContributions: Number(pandemicPosterContributions),
    id: "Github-Profile",
    internal: {
      type: `GitHubProfile`,
      mediaType: `text/plain`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(
          JSON.stringify({
            totalContributions,
            commits,
            pandemicPosterContributions,
          })
        )
        .digest(`hex`),
      description: `Github Profile Information`,
    },
  })
}
