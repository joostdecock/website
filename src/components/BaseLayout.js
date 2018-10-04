import React from "react"
import {Helmet} from "react-helmet";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeConfig from '../config/theme';
import '../config/sass/theme.scss';

const theme = createMuiTheme(themeConfig);

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    </Helmet>
    <div className="fs-base">
      {children}
    </div>
  </MuiThemeProvider>
)
