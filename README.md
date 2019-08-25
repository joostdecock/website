# DEPRECATED

The freesewing website is maintained in the [freesewing.org](https://github.com/freesewing/freesewing.org) repository.

<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# website

This is a work in progress to build [a new freesewing.org 
frontend](https://beta.freesewing.org/) to go along
the JavaScript rewrite of our core library.

We're using the [Gatsby](https://www.gatsbyjs.org/) static site generator
and the [material-ui](https://material-ui.com/) React components.

## Getting started

Clone this repository, then cd into it and install the dependencies:

```sh
git clone git@github.com:freesewing/website.git
cd website
npm install
```

Install the `gatsby-cli` package globally:

```sh
sudo npm install --global gatsby cli
```

> The gatsby image processing plugin requires `nasm`. If you're in Linux, you might need to install it:
> 
> ```sh
> sudo apt-get install nasm
> ```


Then, you can serve the site on localhost:8000:

```sh
gatsby develop
```

## Questions / feedback / ideas / comments

As this is a work in progress, we really appreciate your input.
Join [our chatroom on Gitter](https://gitter.im/freesewing/freesewing)
to discuss this and all things freesewing.

Don't worry, we're nice :smile:
