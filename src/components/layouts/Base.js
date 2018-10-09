import React from "react"
import {Helmet} from "react-helmet";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeConfig from '../../config/theme';
import AppBar from "../AppBar";
import { languageFromSlug } from "../../utils";
import '../../config/sass/theme.scss';

const theme = createMuiTheme(themeConfig);

export default class Base extends React.Component {
  render() {
    let language = languageFromSlug(this.props.slug);
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        </Helmet>
        <div className="fs-base">
          <AppBar language={language} slug={this.props.slug}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
