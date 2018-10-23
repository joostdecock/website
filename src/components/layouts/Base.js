import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import { setDarkMode } from "../../store/actions/darkMode";
import { setUserAccount } from "../../store/actions/user";

addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

class Base extends React.Component {
  handleToggleDarkMode = () => {
    const { dark, setDarkMode } = this.props;
    setDarkMode(!dark);
  };

  render() {
    console.log("Base props", this.props);
    let language = languageFromSlug(this.props.slug);
    const { dark, splash } = this.props;
    let footer = splash ? "" : <Footer language={language} />;
    let classes = dark ? "dark" : "light";
    if (splash) classes += " splash";
    return (
      <IntlProvider locale={language} messages={strings[language]}>
        <MuiThemeProvider theme={loadTheme(this.props.dark)}>
          <Helmet>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <body className={classes} />
          </Helmet>
          <div className="fs-base">
            <AppBar
              user={this.props.user}
              setUserAccount={this.props.setUserAccount}
              language={language}
              slug={this.props.slug}
              dark={dark}
              toggleDarkMode={this.handleToggleDarkMode}
            />
            {this.props.children}
            {footer}
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  dark: state.darkMode,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setDarkMode: dark => dispatch(setDarkMode(dark)),
  setUserAccount: account => dispatch(setUserAccount(account))
});

Base.propTypes = {
  dark: PropTypes.bool,
  splash: PropTypes.bool
};

Base.defaultProps = {
  splash: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Base);
