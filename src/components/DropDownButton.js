import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import DropDownItem from "./DropDownItem";
import { FormattedMessage } from "react-intl";
import Divider from "@material-ui/core/Divider";

class DropDownButton extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 0
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
    let icon = "";
    let label = "";
    if (typeof this.props.text === "string") {
      label = <span className="not-on-mobile">{this.props.text}</span>;
    } else {
      label = <FormattedMessage id={this.props.label} />;
    }
    if (this.props.icon.type === "inline") {
      icon = (
        <div
          style={{ display: "inline-block", paddingRight: "10px" }}
          dangerouslySetInnerHTML={{ __html: this.props.icon.svg }}
        />
      );
    }
    return (
      <div>
        <Button
          aria-haspopup="true"
          aria-controls={this.props.label}
          aria-label={this.props.label}
          onClick={this.handleClickListItem}
          color="inherit"
          title={this.props.title}
        >
          {icon}
          {label}
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id={this.props.label}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.items.map((item, index) => {
            if (item === "divider") return <Divider key={"divider" + index} />;
            else
              return (
                <DropDownItem
                  key={item.label + "__" + index}
                  onClick={this.handleMenuItemClick}
                  selected={false}
                  {...item}
                />
              );
          })}
        </Menu>
      </div>
    );
  }
}

DropDownButton.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.object,
  items: PropTypes.array.isRequired
};

DropDownButton.defaultProps = {
  icon: {}
};

export default DropDownButton;
