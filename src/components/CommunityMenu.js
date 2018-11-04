import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Icon from "@material-ui/core/Icon";
import i18nConfig from "../config/i18n";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

class CommunityMenu extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: i18nConfig.languages.indexOf(this.props.language)
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  items = [
    {
      icon: "camera_alt",
      label: "showcase",
      link: "/showcase"
    },
    {
      icon: "camera_alt",
      label: "showcase",
      link: "/showcase"
    },
    {
      icon: "camera_alt",
      label: "showcase",
      link: "/showcase"
    }
  ];

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-haspopup="true"
          aria-controls="community-menu"
          aria-label="ommunity menu"
          onClick={this.handleClickListItem}
          color="inherit"
        >
          <FormattedMessage id="app.community" />
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="community-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.items.map((item, index) => (
            <MenuItem
              key={item.label}
              selected={this.props.language === item}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <Link
                className="menu"
                to={locLang.set(item.link, this.props.language)}
              >
                <Icon className="menu-icon">{item.icon}</Icon>
                <FormattedMessage id={"app." + item.label} />
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

CommunityMenu.propTypes = {
  language: PropTypes.string.isRequired
};

export default CommunityMenu;
