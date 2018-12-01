import React from "react";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ArrowDropDown";
import CollapseIcon from "@material-ui/icons/ArrowDropUp";
import IconButton from "@material-ui/core/IconButton";

class Tray extends React.Component {
  state = {
    extraClasses: "unforced"
  };

  handleCollapse = event => {
    this.setState({ extraClasses: "force-collapsed" });
  };

  handleExpand = event => {
    this.setState({ extraClasses: "force-expanded" });
  };

  render() {
    return (
      <div
        className={
          this.state.extraClasses + " tray shadow1 " + this.props.className
        }
      >
        {this.props.title === false ? (
          ""
        ) : (
          <TrayTitle icon={this.props.icon}>
            {this.props.title}
            <IconButton className="toggle expand" onClick={this.handleExpand}>
              <ExpandIcon className="toggle" />
            </IconButton>
            <IconButton
              className="toggle collapse"
              onClick={this.handleCollapse}
            >
              <CollapseIcon className="toggle" />
            </IconButton>
          </TrayTitle>
        )}
        <div className="content">
          {this.props.children}
          <TrayFooter>{this.props.footer}</TrayFooter>
        </div>
      </div>
    );
  }
}

Tray.defaultProps = {
  icon: <InfoIcon />,
  footer: "",
  title: ""
};

export default Tray;
