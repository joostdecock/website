import React from "react";
import BlogIndex from '../../components/BlogIndex';
import { graphql } from "gatsby"

export default ( { data } ) => {
  let posts = [];
  for(let edge of data.posts.edges) posts.push(edge.node);

  return (
    <section>
      <h1>Blog</h1>
      <BlogIndex posts={posts} />
    </section>
) }

export const pageQuery = graphql`
  query getBlogPosts {
    posts: allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/en/blog/"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
			edges {
  			node {
          fileAbsolutePath
    			frontmatter {
            date(fromNow: true)
    			  path
    			  title
    			  linktitle
    			  img {
              childImageSharp {
                fluid(maxWidth: 2000) {
                   base64
                   aspectRatio
                   src
                   srcSet
                   sizes
                }
              }
            }
    			  author
    			  category
    			  blurb
    			}
  			}
			}
		}
	}`;
