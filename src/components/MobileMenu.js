import React from "react";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { slugForLanguage } from "../utils";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "gatsby";
import MobileSubMenu from "./MobileSubMenu";
import {
  communityMenu,
  documentationMenu,
  getUserMenuItems
} from "../config/menus";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/PersonAdd";
import BlogIcon from "@material-ui/icons/ImportContacts";
import Logo from "./Logo";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class MobileMenu extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    let userMenu = "";
    if (this.props.user) {
      userMenu = (
        <MobileSubMenu
          language={this.props.language}
          text={"@" + this.props.user.username}
          intl={this.props.intl}
          items={getUserMenuItems(
            this.props.language,
            this.props.user.username,
            this.props.handleLogout
          )}
          key="userMenu"
        />
      );
    } else {
      userMenu = [
        <h5 key="login">
          <Link
            onClick={this.handleClose}
            to={slugForLanguage("/login/", this.props.language)}
            title={this.props.intl.formatMessage({ id: "app.logIn" })}
          >
            <LoginIcon className="mr20" />
            <FormattedMessage id="app.logIn" />
          </Link>
        </h5>,
        <h5 key="logout">
          <Link
            onClick={this.handleClose}
            to={slugForLanguage("/signup/", this.props.language)}
            title={this.props.intl.formatMessage({ id: "app.signUp" })}
          >
            <SignupIcon className="mr20" />
            <FormattedMessage id="app.signUp" />
          </Link>
        </h5>
      ];
    }
    return (
      <div>
        <Button
          color="inherit"
          onClick={this.handleOpen}
          style={{ marginRight: "-24px" }}
          title={this.props.intl.formatMessage({ id: "app.menu" })}
        >
          <MenuIcon style={{ fontSize: "48px" }} />
        </Button>
        <Modal
          aria-describedby="mobile-menu-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className="mobile-menu" onClick={this.handleClose}>
            <AppBar color="secondary" elevation={0}>
              <Toolbar>
                <span style={styles.grow} />
                <Button
                  color="inherit"
                  onClick={this.handleClose}
                  style={{ marginRight: "-24px" }}
                  title={this.props.intl.formatMessage({ id: "app.close" })}
                >
                  <CloseIcon style={{ fontSize: "48px" }} />
                </Button>
              </Toolbar>
            </AppBar>
            <div id="modal-menu-description" className="mobile-menu-inner">
              <h5>
                <Link
                  onClick={this.handleClose}
                  to={slugForLanguage("/blog/", this.props.language)}
                  title={this.props.intl.formatMessage({
                    id: "app.freesewing"
                  })}
                >
                  <Logo size={24} className="mr20" />
                  <FormattedMessage id="app.freesewing" />
                </Link>
              </h5>
              <h5>
                <Link
                  onClick={this.handleClose}
                  to={slugForLanguage("/blog/", this.props.language)}
                  title={this.props.intl.formatMessage({ id: "app.blog" })}
                >
                  <BlogIcon className="mr20" />
                  <FormattedMessage id="app.blog" />
                </Link>
              </h5>
              <MobileSubMenu
                language={this.props.language}
                intl={this.props.intl}
                {...documentationMenu(this.props.language)}
              />
              <MobileSubMenu
                language={this.props.language}
                intl={this.props.intl}
                {...communityMenu(this.props.language)}
              />
              {userMenu}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MobileMenu;
