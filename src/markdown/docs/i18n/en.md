---
title: Documentation for translators
path: /en/docs/i18n
---

If you like to help translate freesewing.org, this is the documentation for you.

> We are currently rebuilding our website, and that includes 
> some changes for translators.
>
> If something is not clear, please 
> [join us on Gitter](https://gitter.im/freesewing/freesewing)
> so we can clear up any confusion.

## Languages

English is our origin language. Which means that everything is written in English
and then translated from English into other languages.

Those other languages can be anything you want. You can help with a
language that's already worked on, or you can 
[start translating to a new language](#starting-a-new-language).


## Types of translation work

There are two types of translation:

### Strings in YAML

Strings means all of the words and sentences that are used in our code.
Strings are always stored in YAML files, which have the `.yaml` extension.

How to translate strings is explained in the [documentation on translating YAML](/docs/i18n/yaml)

### Content in MarkDown

Content are things like documentation, blog posts, and so on. 
Content is always stored in **MarkDown** files, which have the `.md` entension.
This page you're reading right now is an example of content.

How to translate content is explained in the [documentation on translating MarkDown](/docs/i18n/markdown)

## How we work

When different people work together on the same set of files,
it's easy to overwrite each other's work. Without the right tools, avoiding this
requires a lot of coordination. 

As a loose-knit team of volunteers, coordination is minimal. Instead, we trust technology.
People have been writing software together for decades, and this problem has long been solved.

We use git to handle versioning of our files, and all our code is hosted on GitHub.

If you are new to git and/or GitHub you may find it intimidating. However, you will soon discover
that as far as skills for the modern age go, learning to use GitHub is going to be a nice
feather in your cap.

### Making changes the easy way

Many small changes can be made on the GitHub website. 
You can simply go to 
[our website repository](https://github.com/freesewing/website),
navigate to the file you want to change, and click the pencil button.

After you've made your changes, you can click the **Propose file change** to submit them.

In the background, this will create a copy for you (a so-called fork), 
put your changes in it, and submit a pull request all in one go.

> Tip: The little GitHub icon behind a page title leads you to the right place. Try it on this page.

### Making changes like a boss

Now we're getting to the good stuff. Here's how you graduate from being a noob:

#### Fork our repository on GitHub

Go to [our website repository](https://github.com/freesewing/siteweb) 
and click the **fork** button.
This will create a copy of the repository under your own account.

#### Clone the repository to to your computer

Use git or [the GitHub app](https://desktop.github.com) to clone this repository to your computer.

It will give you a complete local copy on which you can go to town.
You can use the editor of your choice, work while you are offline and do whatever you want.

#### Push your changes to GitHub

When you've done what you wanted to do, you can **push** the changes
on your computer to your repository in GitHub.

#### Submit a pull request

Your fork of our repository now has changes in it that we do not have.
This is when you submit a pull request to say *hey guys, I did some work here*
and we will pull in those changes, and merge your work with that of others.


Once again, don't let it overwhelm you. 
It won't be long before the *fork => clone => do your work => push => pull request*
routine will become second nature to you.

