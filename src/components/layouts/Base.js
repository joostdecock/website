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
import Footer from "../Footer";

const theme = createMuiTheme(themeConfig);

addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

export default class Base extends React.Component {
  state = {
    dark: false
  };

  handleToggleDarkMode = () => {
    this.setState({ dark: !this.state.dark });
  };

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
            <body className={this.state.dark ? "dark" : "light"} />
          </Helmet>
          <div className="fs-base">
            <AppBar
              language={this.props.language}
              slug={this.props.slug}
              dark={this.state.dark}
              toggleDarkMode={this.handleToggleDarkMode}
            />
            {this.props.children}
            <Footer />
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}
