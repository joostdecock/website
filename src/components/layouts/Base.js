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
import { locLang, loadTheme, clearToken, retrieveToken } from "../../utils";
import { setDarkMode } from "../../store/actions/darkMode";
import { setUserAccount } from "../../store/actions/user";
import Notification from "../Notification";
import { closeNotification } from "../../store/actions/notification";
import withRoot from "../../withRoot";
import backend from "../../backend";
import LocationProvider from "../LocationProvider";
// eslint-disable-next-line
import bodyFont from "typeface-domine";
// eslint-disable-next-line
import titleFont from "typeface-open-sans-condensed";

addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

class Base extends React.Component {
  handleToggleDarkMode = () => {
    const { dark, setDarkMode } = this.props;
    setDarkMode(!dark);
  };

  handleLogout = () => {
    clearToken();
    this.props.setUserAccount(false);
  };

  componentDidMount() {
    if (!this.props.user) {
      let token = retrieveToken();
      if (token) {
        backend
          .account()
          .then(res => {
            if (res.status === 200) {
              this.props.setUserAccount(res.data.account);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  render() {
    const { dark, splash, location } = this.props;
    let language = locLang.get(location);
    let footer = splash ? "" : <Footer language={language} />;
    let classes = dark ? "dark" : "light";
    if (splash) classes += " splash";
    // Passing location and language props down to children
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { location, language });
    });
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
              handleLogout={this.handleLogout}
              language={language}
              location={location}
              dark={dark}
              toggleDarkMode={this.handleToggleDarkMode}
            />
            <div className="wrap">{children}</div>
            {footer}
          </div>
          <Notification
            style={this.props.notification.style}
            message={this.props.notification.message}
            onClose={() => this.props.closeNotification()}
            open={this.props.notification.show}
          />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  dark: state.darkMode,
  user: state.user,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setDarkMode: dark => dispatch(setDarkMode(dark)),
  setUserAccount: account => dispatch(setUserAccount(account)),
  closeNotification: () => dispatch(closeNotification())
});

Base.propTypes = {
  dark: PropTypes.bool,
  splash: PropTypes.bool
};

Base.defaultProps = {
  splash: false,
  dark: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(LocationProvider(Base)));
