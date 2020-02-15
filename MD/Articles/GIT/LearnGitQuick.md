---
type: "Article"
path: "/articles/gimme-git-quick"
title: "Gimme Git Quick 🏃‍"
desc: "For the people who needed to know git yesterday. "
year: 2019
date: 2019-10-01
---

### 🚨DISCLAIMER: This is by no means a comprehensive guide to using git. It is intended to be used in hackathon type scenarios where you team want to use it but you've never touched it before. If you are looking for something more in depth check out this [awesome article](https://medium.com/@george.seif94/a-full-tutorial-on-how-to-use-github-88466bac7d42).

<h1>Super Super Compressed Quick Start</h1>

*Look at this section only if you have no time.* Otherwise [jump to the next chapter](#0) for a more comprehensive guide. This chapter is literally the _how_ without the _why_.

0 - Install git

[Click here to get git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git )

1 - Clone the repo (Swap out URL for your team's repo)

```
git clone https://github.com/slarsendisney/personal-site.git

```
Now ``` cd ``` into the project folder.

2 - Create a branch

```
# If you are working on different features:
git checkout -b feature/name-of-the-feature

# If you prefer to identify by team mate:
git checkout -b your-name/thing you are working on
```

3 - Code the thing ⚡️

![Code](https://ik.imagekit.io/sld/code_8h0lMiPBd.gif)

4 - Commmit and push your code

If you need to ignore any files add a `.gitignore` file and inside write the names of any files/folders you want to ignore:
```
a-folder-to-ignore/
a-file-to-ignore.js
```
Add your code to the staging area:
```
git add -A
```
Commit it with a suitable message:
```
# This example uses conventional commit format -> https://www.conventionalcommits.org

git commit -m "fix(client): Fixed bug that caused infinite rerenders in index.js"
```
Time to push it to the repo
```
git push
```

Your code is now in the cloud ☁. But its not on master! Time to raise a PR:
```
1. Navigate to the repo
2. Click on Pull requests
3. Click New pull request
4. Select master as base branch and then select your branch as the head branch
5. Click Create pull request.
6. Get it approved and merged by your team.
7. All done. ✅
```

Merge conflicts?

[This will fix them](https://github.com/AgileVentures/MetPlus_PETS/wiki/Resolving-Pull-Request-merge-conflicts).

<h1>The Less Compressed Guide</h1>
<h2 id="0">Getting git</h2>
Before anything below works you're going to need to make sure you have git. Head here:

[``` Getting Started Installing Git ```](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git )

Not sure if you have git? Open a terminal and type:

``` 
git --version 
```

If you get a version number back, then congrats you already have git 🎉! If you don't, you'll need to install it. 

<h2 id="1">What is this git thing anyway?</h2>

Git is distributed version control that allows you to track progress over time. Everyone working on the project has their own local copy of it as opposed to working on a centralised copy.

<h2>Then what the hell is GitHub?</h2>

Github is online storage and access for git. Through the site you can set up repositories where you can store your code. There are also many alternatives to Github such as Bitbucket. As a student, you get private repositories on both of these services for free so make the most of it!

<h2>How do I make a repository?</h2>

1. Log In/Sign Up to Github
2. Click on your profile
3. Click on _Repositories_
4. Hit _New_ 

<h2>How do I get code from git?</h2>

In order to pull code down from a git repository you need to clone the repository using the repository's URL. This creates a local copy for you to work with.  So for example, if you wanted to clone a copy of this website you could use:

```
git clone https://github.com/slarsendisney/personal-site.git 
```

Just switch out the URL above with wherever your code is stored and you'll be good to go 👍. Now branch of the code right away!

<h2>How do I use branches?</h2>

Branching allows you to isolate your code when working on new features/bug fixes. Changes to the master branch do not affect your branch and as a result you are less likely to run into issues. Creating a new branch does not change the repository; it simply points out the commit.

You can create a branch using the following format:
```
# If you are working on different features:
git checkout -b feature/name-of-the-feature

# If you prefer to identify by team mate:
git checkout -b your-name/thing you are working on
```

At this point you are ready to code away. Enjoy and keep reading when you are ready to save your code😀!

<h2>Committing code</h2>

Committing code saves your code changes to your local repository. You have to tell git which files you want it to keep track of though. The easiest way to do this is to create a git ignore file and then add the rest.
Create a .gitignore file with all the files you want git to ignore:
```
a-folder-to-ignore/
a-file-to-ignore.js
```

We can now add all our other files to git with the following command:
```
git add -A
```
the `-A` flag tells git to add all files. If you ever add new files to the project you'll need to run this again.

### At this point we are ready to commit 🎉.

Commit it with a suitable message - thats important because it helps you identify what you did in any given commit if you ever look back over them. This example uses the [conventional commit format](https://www.conventionalcommits.org). Its a great format that makes it super easy to tell whats going on:
```
feature(scope): description
```
First you specify the type of the commit, then in brackets you put the scope of the project it affects, and then you add a description. A real example can be seen below:
```
git commit -m "fix(client): Fixed bug that caused infinite rerenders in index.js"
```

<h2>How do I get my code back to GitHub?</h2>
At this point, everything we've done has been local - lets send our code to the cloud! We need to push it up there - this sends changes on your branch up to the remote branch.

```
git push --set-upstream origin your-branch-name
```

By adding in the `--set-upstream` it allows to stop specify which branch that you want to pull from every single time that you do git pull.
<h2>Get your code on master</h2>
Its time to raise a pull request(or PR!)

```
1. Navigate to the repo
2. Click on Pull requests
3. Click New pull request
4. Select master as base branch and then select your branch as the head branch
5. Click Create pull request.
6. Get it approved and merged by your team.
7. All done. ✅
```
<h2>Merge conflicts</h2>
How to solve them coming soon 😢

<h2>Other cool git resources</h2>

[Oh Shit, Git!?!](https://ohshitgit.com/)

Some bad situations I've gotten myself into, and how I eventually got myself out of them in plain english. 
_By Katie Sylor-Miller_