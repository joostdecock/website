import React from "react";
import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core/styles";
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
import { languageFromSlug, loadTheme } from "../../utils";

addLocaleData([...en, ...de, ...es, ...fr, ...nl]);
const theme = loadTheme(false);

export default class Base extends React.Component {
  state = {
    dark: false,
    theme: theme
  };

  handleToggleDarkMode = () => {
    this.setState({
      dark: !this.state.dark,
      theme: loadTheme(!this.state.dark)
    });
  };

  render() {
    let language = languageFromSlug(this.props.slug);
    return (
      <IntlProvider locale={language} messages={strings[language]}>
        <MuiThemeProvider theme={this.state.theme}>
          <Helmet>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <body className={this.state.dark ? "dark" : "light"} />
          </Helmet>
          <div className="fs-base">
            <AppBar
              language={language}
              slug={this.props.slug}
              dark={this.state.dark}
              toggleDarkMode={this.handleToggleDarkMode}
            />
            {this.props.children}
            <Footer language={language} />
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}
