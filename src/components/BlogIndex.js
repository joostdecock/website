import React from "react";
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import BlogPostPreview from './BlogPostPreview';
import Grid from '@material-ui/core/Grid';

export default class BlogIndex extends React.Component {


  render() {
  let list = [];
  for(let post of this.props.posts) {
    list.push(<Grid item xs={12} sm={6}><BlogPostPreview post={post} /></Grid>)
  }

    return (
      <PageLayout>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={8} className={'wmax'}>
          <h1 className="txt-center">Blog</h1>
          <Grid container spacing={24}>{list}</Grid>
        </Grid>
      </PageLayout>
    );
  }
}

BlogIndex.propTypes = {
    posts: PropTypes.array,
};
