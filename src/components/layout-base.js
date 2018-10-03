import React from "react"
import {Helmet} from "react-helmet";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeConfig from '../config/theme';
import '../data/sass/theme.scss';

const theme = createMuiTheme(themeConfig);

export default ({ children }) => (
    <MuiThemeProvider theme={theme}>
  <div className="layout-wrapper">
    <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    </Helmet>
    {children}
  </div>
    </MuiThemeProvider>
)
