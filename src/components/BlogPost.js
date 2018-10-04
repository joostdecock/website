import React from "react"
import BlogLayout from '../components/BlogLayout';
import Grid from '@material-ui/core/Grid';

export default ( data ) => {
  const frontmatter = data.pageContext.node.frontmatter;
  const html = data.pageContext.node.html;
  console.log(data, frontmatter);

  return (
  <BlogLayout>
    <Grid item xs={12} sm={10} md={8} lg={5} xl={5}>
      <div className="blog-header">
        <figure className="blog">
          <img src="https://via.placeholder.com/1280x900" alt={frontmatter.caption} />
          <figcaption>{frontmatter.caption}</figcaption>
        </figure>
      </div>
    </Grid>
    <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
      <div className="blog-post">
        <ul className="meta">
          <li>{frontmatter.date}</li>
          <li>#{frontmatter.category}</li>
        </ul>
        <h1>{frontmatter.title}</h1>
        <article dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Grid>
  </BlogLayout>
) }
