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
import { communityMenu, documentationMenu } from "../config/menus";
import LoginIcon from "@material-ui/icons/VpnKey";
import BlogIcon from "@material-ui/icons/ImportContacts";

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
              <h3>
                <Link
                  onClick={this.handleClose}
                  to={slugForLanguage("/blog/", this.props.language)}
                  title={this.props.intl.formatMessage({
                    id: "app.freesewing"
                  })}
                >
                  <BlogIcon className="mr20" />
                  <FormattedMessage id="app.freesewing" />
                </Link>
              </h3>
              <h3>
                <Link
                  onClick={this.handleClose}
                  to={slugForLanguage("/blog/", this.props.language)}
                  title={this.props.intl.formatMessage({ id: "app.blog" })}
                >
                  <BlogIcon className="mr20" />
                  <FormattedMessage id="app.blog" />
                </Link>
              </h3>
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
              <h3>
                <Link
                  onClick={this.handleClose}
                  to={slugForLanguage("/login/", this.props.language)}
                  title={this.props.intl.formatMessage({ id: "app.logIn" })}
                >
                  <LoginIcon className="mr20" />
                  <FormattedMessage id="app.logIn" />
                </Link>
              </h3>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MobileMenu;
