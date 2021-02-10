---
title: Site Rebuild
type: "Article"
date: 2021-02-10
desc: This site has recently undergone a rather major rework. After falling in love with TailwindCSS I just had to incorporate it along with some new features that I think are pretty neat. 
coverimg: "./hero.png"
tags: [ux, react, gatsby]
---

This site has recently undergone a rather major rework. After falling in love with TailwindCSS I just had to incorporate it along with some new features that I think are pretty neat. This is a broad overview - watch this space for more in-depth looks soon.

For those that might want some context when reading through this article, you can see the original site at [v1.sld.codes](https://v1.sld.codes).

## Moving to TailwindCSS

>According to the [official documentation](https://tailwindcss.com), Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. I like to think of it as a cool way to write inline styling and achieve an awesome interface without writing a single line of your own CSS.

Tailwind has been an absolute game-changer for my projects. I've been learning it over the last year and using it whenever I can and, now that I have a handle on it, I thought I would bring it to sld.codes. I actually ended up with a way smaller bundle size compared to before because tailwind purges and minifies your classnames for free. I was amazingly surprised by how customisable the thing is coming from a world where it seemed the two most popular options were Bootstrap and MaterialUI. 

## Theme Picker

Inspired by [@mxbck](https://twitter.com/mxbck)'s themes - I decided to add my own spin. I initially started by just making a default theme picker. Four themes that you can choose between with a dark and light default that you start on depending on your system:

```
export const lightThemes = new Set(["Blue", "Rhubarb and Custard"]);
export const darkThemes = new Set(["Midnight Dreams", "Apocalypse"]);
```

All. the themes are defined in scss:

````
.theme-blue {
    --color-bg-primary: #41539b;
    --color-bg-accent: #FE5F55; 
    --color-bg-secondary: #ccdefd;
}
````

And then added into my tailwind config:

````
theme: {
	extend:{
		textColor: {
			primary: "var(--color-text-primary)",
    	secondary: "var(--color-text-secondary)",
		},
		backgroundColor: {
			primary: "var(--color-bg-primary)",
			accent: "var(--color-bg-accent)",
			secondary: "var(--color-bg-secondary)",
		},
  },
},
````

I also contributed to [gatsby-plugin-theme-switcher](https://www.gatsbyjs.com/plugins/gatsby-plugin-theme-switcher/) to help remove the "white flash" when navigating to the site after setting a non-default theme:

```
{
	resolve: "gatsby-plugin-theme-switcher",
	options: {
		defaultDarkTheme: "theme-midnightdreams",
		defaultLightTheme: "theme-blue",
		themeStorageKey: "theme",
		minify: true,
	},
}
```

### Taking it one step further

This whole rebrand has been really focused on user retention. While I was building out the themes, I thought it might be fun to "lock" some of the themes away.

With a little mixture of local storage and redux I was able to find a combination that allowed me to lock themes until you could find them on the site. If you want you can [delve into the code](https://github.com/slarsendisney/personal-site/blob/master/src/components/themePicker.js) and see how they work.

What are you waiting for? **Explore the site and find those themes!**

## Custom Social Images

I was always fascinated with how [@JoshWComeau](https://twitter.com/JoshWComeau) had custom meta images for each blog post, but I finally cracked it with a modified version of [@andrioid](https://twitter.com/andrioid)'s [gatsby-plugin-social-cards](https://www.gatsbyjs.com/plugins/gatsby-plugin-social-cards/). 

I've recently got into the habbit of taking plugins from the gatsby eco-system and then modifying them to my use-case. It's actually really helped me set higher code standards for my plugins but also helped me not rewrite the same basic configuration I would need to set up.

## Footer

My footer used to only have the text "Made with ❤️ by Sam Larsen-Disney" in it. I suddenly realised that no matter what page you are on, if you're enjoying the content and read to the bottom you would hit that footer and not know what to look at next. At this point on any page you wouldn't find any call-to-actions - I think this led to some drop-off and I wasn't happy. 

The new footer contains a bunch more information and links, hopefully addressing all the reasons you may be on the site:

- More information about me - If you're a recruiter looking to work out if I'm the right person for a role.
- More of my posts - If you want to read more of my content.
- Quick Links - To help you find the most popular parts of my site.
- Social Links - If you want to find me elsewhere.
- Page stats - for the nerds like me!

## Removing Dates

I'm not a born writer. I feel like writing is like being on a rollercoaster, sometimes you feel like you have soo much to talk about and other times you cant get more than a few words out. I found that adding the date to the content I put out amplified the negative feelings I sometimes have when writing. The further I would get from the last publish date, the worse I would feel about not having something new to say.

This led me to remove the publish date from my article pages. This should mean you, "the users", have no idea whether the content you're reading really is brand new or whether its a little bit older. It also has given me a little bit more piece of mind.

## Search

I always felt like the [search](/search) page was the one page that just felt a little "empty". If people are on this page they are either looking for something specific or they are looking to explore more. I wanted to make that second option "exploring" easier. I figured I would add a recommendations section featuring some projects and articles.

I also modified the results of a search to include more variation. Some have images, some have tags, all in the hopes to improve visual interest.

## Newsletter

I wanted my newsletter to match the new design of the site. The ideal outcome for me would be take my tailwind styles across to the newsletter. After some googling I came across [Maizzle]() which achieves this almost effortlessly. I'll be writing a more detailed breakdown of how I use Maizzle in the near future. For now, if you want to see the new format for yourself fill in the form below 👇.