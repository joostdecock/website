import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { slugForLanguage } from "../utils";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "gatsby";
import MobileSubMenu from "./MobileSubMenu";
import {
  languageMenu,
  communityMenu,
  documentationMenu
} from "../config/menus";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

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
        >
          <MenuIcon style={{ fontSize: "48px" }} />
        </Button>
        <Modal
          aria-describedby="mobile-menu-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className="mobile-menu" onClick={this.handleClose}>
            <AppBar
              color={this.props.dark ? "primary" : "secondary"}
              elevation={0}
            >
              <Toolbar>
                <span style={styles.grow} />
                <Button
                  color="inherit"
                  onClick={this.handleClose}
                  style={{ marginRight: "-24px" }}
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
                >
                  <FormattedMessage id="app.blog" />
                </Link>
              </h3>
              <MobileSubMenu
                language={this.props.language}
                {...documentationMenu(this.props.language)}
              />
              <MobileSubMenu
                language={this.props.language}
                {...communityMenu(this.props.language)}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MobileMenu;
