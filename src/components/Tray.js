import React from "react";
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
        {this.props.title === false ? (
          ""
        ) : (
          <TrayTitle icon={this.props.icon}>
            {this.props.title}
            <a className="toggle expand" onClick={this.handleExpand}>
              <ExpandIcon className="toggle" />
            </a>
            <a className="toggle collapse" onClick={this.handleCollapse}>
              <CollapseIcon className="toggle" />
            </a>
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
