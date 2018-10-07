import React from "react";
import path from "path";
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import BlogPostPreview from './BlogPostPreview';
import Grid from '@material-ui/core/Grid';
//import { graphql } from "gatsby"
//import Image from "gatsby-image"

export default class BlogIndex extends React.Component {


  render() {
  let list = [];
  for(let post of this.props.posts) {
    let image = this.props.images[path.basename(post.frontmatter.path)+"/"+post.frontmatter.img];
    list.push(<Grid item xs={12} sm={6}><BlogPostPreview post={post} image={image}/></Grid>)
  }

    return <PageLayout>
      <Grid item xs={12} sm={12} md={10} lg={8} xl={8} className={'wmax'}>
      <h1 className="txt-center">Blog</h1>
      <Grid container spacing={24}>
          {list}
      </Grid>
      </Grid>
        </PageLayout>
  }
}

BlogIndex.propTypes = {
    posts: PropTypes.array,
    images: PropTypes.object
};
