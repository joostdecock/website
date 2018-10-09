import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { slugForLanguage } from "../utils";
import { FormattedMessage } from 'react-intl';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function FsAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="secondary" elevation={0}>
        <Toolbar>
          <Button color="inherit" href={slugForLanguage('/', props.language)}>
            <FormattedMessage id="app.freesewing" />
          </Button>
          <Button color="inherit" href={slugForLanguage('/blog/', props.language)}>
            <FormattedMessage id="app.blog" />
          </Button>
          <span style={styles.grow} />
          <LanguageSwitcher language={props.language} slug={props.slug}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

FsAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default withStyles(styles)(FsAppBar);
