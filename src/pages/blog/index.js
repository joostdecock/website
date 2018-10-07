import React from "react";
import path from 'path';
import BlogIndex from '../../components/BlogIndex';
import { graphql } from "gatsby"

export default ( { data } ) => {
  console.log('all data blog page', data);
  let posts = [];
  for(let edge of data.posts.edges) {
    posts.push(edge.node);
  }
  let images = {};
  for(let edge of data.images.edges) {
    //let imgName = path.basename(edge.node.relativePath);
    let imgPath = path.basename(path.dirname(edge.node.relativePath))
      .substring(5) + "/" + path.basename(edge.node.relativePath);
    images[imgPath] = edge.node;
  }

  return (
      <section>
      <h1>Blog</h1>
  <BlogIndex posts={posts} images={images} />
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
    			  img
    			  author
    			  category
    			  blurb
    			}
  			}
			}
		}
    images: allFile (
			filter: {
        relativePath: {regex: "/blog/"}
        ext: {in: [".jpg"]}
      }) {
      edges {
        node {
          ext
          relativePath
          id
          name
          dir
          childImageSharp {
            fluid(maxWidth: 720) {
              ...GatsbyImageSharpFluid
            }
          }
	      }
	    }
	  }
	}`;
