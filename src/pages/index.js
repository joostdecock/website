import React from "react"
import PageLayout from "../components/layouts/Page"
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { Link } from "gatsby"
import { FormattedMessage } from 'react-intl';

export default ({pageContext}) => (
  <PageLayout slug={pageContext.slug}>
  <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  >
  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
  <h1><FormattedMessage id="app.sewingPatternsForNonAveragePeople" /></h1>

  <p>This is a work in progress to build a new freesewing.org
  frontend to go along the JavaScript rewrite of our core library.</p>

  <p>As this is a work in progress, we really appreciate your input.
  Join <a href="https://gitter.im/freesewing/freesewing">our chatroom
  on Gitter</a> to to discuss this and all things freesewing.</p>

  <h2>Building blocks</h2>
<img src="./logo.jpg" alt="logo"/>
  <p>Building a frontend for freesewing requires a solution for a
  number of challenges. As we are just getting started, our focus is on:
  </p>
  <ul>
  <li>
    <Icon>star</Icon>
    <a href="#platform">Platform</a>
  </li>
  <li>
    <Icon>star</Icon>
    <a href="#ui-framework">UI Framework</a>
  </li>
  <li>
    <Icon>star_half</Icon>
    <a href="#theming">Theming</a>
  </li>
  <li>
    <Icon>star_half</Icon>
    <a href="#layout">Layout</a>
  </li>
  <li>
    <Icon>star_half</Icon>
    <a href="#typography">Typography</a>
  </li>
  <li>
    <Icon>star_half</Icon>
    <a href="#i18n">Internationalisation (i18n)</a>
  </li>
  <li>
    <Icon>star_border</Icon>
    <a href="#markdown">Markdown support</a>
  </li>
  <li>
    <Icon>star_border</Icon>
    <a href="#authentication">Authentication</a>
  </li>
  </ul>

  <h2 id="platform">Platform</h2>
  <p>We are using <a href="https://www.gatsbyjs.org/">Gatsby</a>, a static site generator
  writting in JavaScript, using <a href="https://reactjs.org/">React</a>.</p>
  <p>Gastbsy was chosen for its speed and rich ecosystem.</p>

  <h2 id="ui-framework">UI Framework</h2>
  <p>To build our interface, we are using <a href="https://material-ui.com/">Material UI</a>,
  a series of React components that implement <a href="https://material.io/">
  Google's Material Design</a>.</p>

  <h2 id="theming">Theming</h2>
  <p>
    Ongoing. See the <a href="https://github.com/freesewing/website/issues/1">
    <b>Theming: Making things pretty</b> issue on GitHub</a>.
  </p>

  <h2 id="layout">Layout</h2>
  <p>
    Ongoing. See the <a href="https://github.com/freesewing/website/issues/2">
    <b>Layout: Build the basic skeleton for pages</b> issue on GitHub
    </a> and <a href="/en/blog/">our blog posts</a>.
  </p>

  <h2 id="typography">Typography</h2>
  <p>We are using the <a href="https://kyleamathews.github.io/typography.js/">typography.js
  </a> package to handle typography-specific style changes. It comes with material-ui, in case you're
  wondering why.</p>
  <p>Basic typography configuration is handled in the <b>src/config/typograhy.js</b> file.
  further customization is done in `src/data/sass/typography/`.</p>
  <p><Link to="/typography">This typography page</Link> has a buch of different elements
  to show you what they look like</p>

  <h2 id="i18n">Internationalisation (i18n)</h2>
    Ongoing. See the <a href="https://github.com/freesewing/website/issues/3">
    <b>i18n: Add support for internationalisation</b> issue on GitHub</a>.

  <h2 id="markdown">Markdown support</h2>
    Ongoing. See the <a href="https://github.com/freesewing/website/issues/4">
    <b>MarkDown support: We need it</b> issue on GitHub</a>.

  <h2 id="authentication">Authentication</h2>
    Ongoing. See the <a href="https://github.com/freesewing/website/issues/5">
    <b>Authentication: Implement MVP</b> issue on GitHub</a>.

  </Grid>
  </Grid>
  </PageLayout>
)
