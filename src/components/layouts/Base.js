import React from "react";
import { Helmet } from "react-helmet";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeConfig from "../../config/theme";
import AppBar from "../AppBar";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import es from "react-intl/locale-data/es";
import fr from "react-intl/locale-data/fr";
import nl from "react-intl/locale-data/nl";
import strings from "../../data/i18n";
import "../../config/sass/theme.scss";

const theme = createMuiTheme(themeConfig);

addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

export default class Base extends React.Component {
  render() {
    return (
      <IntlProvider
        locale={this.props.language}
        messages={strings[this.props.language]}
      >
        <MuiThemeProvider theme={theme}>
          <Helmet>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          </Helmet>
          <div className="fs-base">
            <AppBar language={this.props.language} slug={this.props.slug} />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}
