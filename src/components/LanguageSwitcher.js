import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/core/Menu";
import i18nConfig from "../config/i18n";
import { slugForLanguage } from "../utils";
import { Link } from "gatsby";

class LanguageSwitcher extends React.Component {
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

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <List component="nav" style={{ padding: 0 }}>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="language-menu"
            aria-label="Language menu"
            onClick={this.handleClickListItem}
          >
            <ListItemText>
              <div
                style={{ display: "inline-block" }}
                dangerouslySetInnerHTML={{
                  __html: i18nConfig.icons[this.props.language]
                }}
              />
              <ArrowDropDownIcon />
            </ListItemText>
          </ListItem>
        </List>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {i18nConfig.languages.map((option, index) => (
            <MenuItem
              key={option}
              selected={this.props.language === option}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <Link
                className="menu"
                to={slugForLanguage(this.props.slug, option)}
                dangerouslySetInnerHTML={{
                  __html:
                    i18nConfig.icons[option] + i18nConfig.translations[option]
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

LanguageSwitcher.propTypes = {
  language: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default LanguageSwitcher;
