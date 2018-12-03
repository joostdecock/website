import React from "react";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { locLang } from "../utils";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import BlogIcon from "@material-ui/icons/RssFeed";
import MobileSubMenu from "./MobileSubMenu";
import {
  communityMenu,
  documentationMenu,
  getUserMenuItems
} from "../config/menus";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/PersonAdd";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "./Icon";
import { tshirt } from "../data/icons";

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
        <hr key="user-hr" />,
        <MenuItem
          key="login"
          button={true}
          component="a"
          onClick={this.handleClose}
          href={locLang.set("/login", this.props.language)}
          title={this.props.intl.formatMessage({
            id: "app.logIn"
          })}
          color="secondary"
        >
          <LoginIcon className="mr1" />
          <FormattedMessage id="app.logIn" />
        </MenuItem>,
        <MenuItem
          key="signup"
          button={true}
          component="a"
          onClick={this.handleClose}
          href={locLang.set("/signup/", this.props.language)}
          title={this.props.intl.formatMessage({
            id: "app.signUp"
          })}
          color="secondary"
        >
          <SignupIcon className="mr1" />
          <FormattedMessage id="app.signUp" />
        </MenuItem>
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
              <MenuItem
                key="home"
                button={true}
                component="a"
                onClick={this.handleClose}
                href={locLang.set("/", this.props.language)}
                title={this.props.intl.formatMessage({
                  id: "app.freesewing"
                })}
                color="secondary"
              >
                <HomeIcon className="mr1" />
                <FormattedMessage id="app.home" />
              </MenuItem>
              <MenuItem
                key="patterns"
                button={true}
                component="a"
                onClick={this.handleClose}
                href={locLang.set("/patterns/", this.props.language)}
                title={this.props.intl.formatMessage({
                  id: "app.patterns"
                })}
                color="secondary"
              >
                <Icon className="mr1" pathString={tshirt} />
                <FormattedMessage id="app.patterns" />
              </MenuItem>
              <MenuItem
                key="blog"
                button={true}
                component="a"
                onClick={this.handleClose}
                href={locLang.set("/blog/", this.props.language)}
                title={this.props.intl.formatMessage({
                  id: "app.blog"
                })}
                color="secondary"
              >
                <BlogIcon className="mr1" />
                <FormattedMessage id="app.blog" />
              </MenuItem>
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
