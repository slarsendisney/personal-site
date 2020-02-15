---
type: "Article"
path: "/articles/retiring-my-animation"
title: "Why I'm Retiring My Landing Page Animation"
desc: "How removing my landing boosted my SEO and site performance."
year: 2020
date: 2020-02-15

---

Since the first version of this website, I've always had an animation on the landing. I used it to demonstrate some of my character, my ability, and to give people a sense that it was unique and not just another squarespace site.

<div class="text-align-center margin-5-t margin-5-b">

<img src="https://ik.imagekit.io/sld/animation_yprOlQ5nG.gif" alt="drawing" width="100%" style="max-width:500px"/>

</div>

Lately I had been hearing more and more, that the animation looks like a loading screen for my site but I disregarded this comment because in my mind it creates delight ✨.

I also had other issues with it as the animation ends in a completly white screen. My site has a dark mode that it defaults to if the user is using dark mode on their device so the user would see this jarring flash from white to black when navigating to the main site. Gross 🤮.

 But the real issues came when I looked at **accessiblity and SEO**. 

## What has your animation got to do with accessibility and SEO?

It turns out a lot! Lets take a look at how the page was implemented:

```jsx
export default () => {
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 2700)
  }, [])
  return (
    <div className="is-blue-bg" style={{ height: "100vh" }}>
      <SEO title="Welcome" />
      <Animation />
    </div>
  )
}

```

In the above snippet, we can see that within the useEffect we trigger a page navigation 2700ms after the page is rendered - the exact length of time it takes to run the animation. I am delaying anyone who visits my site from viewing my content for nearly 3 seconds 😭.

The animation has no alt text, no aria labels, nothing. If you were using a screenreader and landed on this page nothing would be read out. I want my site to be accessible to everyone so I needed to fix this.

The second problem is with SEO. When robots crawl my site, they prefer to find a certain amount of text on every page so that they can properly index the page. They weren't finding anything and as a result the page was not indexing. This was made worse as it was the root of my whole site!

I realised it had to go.

## The result

By removing the animation and making the root my main page, I have made it on to the first page of search results for searches for "Sam Larsen-Disney" & "sld.codes"! 🎉

I'm also hoping for increased engagement as users can get to content 3 seconds faster!

This change also got my lighthouse accessiblity score to 93/100! And dont worry, I am chasing those last 7 points.

## Miss the page? 

You can still see it here: [sld.codes/start](/start)