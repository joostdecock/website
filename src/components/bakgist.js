import React from "react";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ArrowDropDown";
import CollapseIcon from "@material-ui/icons/ArrowDropUp";
import IconButton from "@material-ui/core/IconButton";

class Gist extends React.Component {
  state = {};

  handleCollapse = event => {
    this.setState({ extraClasses: "force-collapsed" });
  };

  handleExpand = event => {
    this.setState({ extraClasses: "force-expanded" });
  };

  render() {
    return (
      <div className="toggle-container txt-center">
        <ToggleButtonGroup exlusive onChange={this.toggleFormat}>
          <ToggleButton
            className={
              this.state.format === "json" ? "toggle selected" : "toggle"
            }
            value="json"
            selected={this.state.format === "json" ? true : false}
          >
            JSON
          </ToggleButton>
          <ToggleButton
            className={
              this.state.format === "yaml" ? "toggle selected" : "toggle"
            }
            selected={this.state.format === "yaml" ? true : false}
          >
            YAML
          </ToggleButton>
        </ToggleButtonGroup>
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
