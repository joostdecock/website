import React from "react";
import PropTypes from "prop-types";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ArrowDropDown";
import CollapseIcon from "@material-ui/icons/ArrowDropUp";

class Tray extends React.Component {
  state = {
    extraClasses: "unforced"
  };

  handleCollapse = event => {
    console.log("collapse");
    this.setState({ extraClasses: "force-collapsed" });
  };

  handleExpand = event => {
    console.log("expand");
    this.setState({ extraClasses: "force-expanded" });
  };

  render() {
    return (
      <div
        className={
          this.state.extraClasses + " tray shadow1 " + this.props.className
        }
      >
        <TrayTitle icon={this.props.icon}>
          {this.props.title}
          <a className="toggle expand" onClick={this.handleExpand}>
            <ExpandIcon className="toggle" />
          </a>
          <a className="toggle collapse" onClick={this.handleCollapse}>
            <CollapseIcon className="toggle" />
          </a>
        </TrayTitle>
        <div className="content">
          {this.props.children}
          <pre>{this.state.collapsed ? "Collapsed" : "Not collapsed"}</pre>
          <TrayFooter>{this.props.footer}</TrayFooter>
        </div>
      </div>
    );
  }
}

Tray.propTypes = {};

Tray.defaultProps = {
  icon: <InfoIcon />,
  footer: ""
};

export default Tray;
