import React from "react";
import Drawer from "../../Drawer";
import { FormattedMessage } from "react-intl";
import MetadataIcon from "@material-ui/icons/Class";
import ActionIcon from "@material-ui/icons/Directions";
import Metadata from "./Metadata";

class Sidebar extends React.Component {
  state = {
    expandedDrawer: "options"
  };

  toggleDrawer = drawer => {
    if (this.state.expandedDrawer === drawer) drawer = "";
    this.setState({ expandedDrawer: drawer });
  };

  render() {
    return (
      <React-Fragment>
        <Drawer
          icon={<MetadataIcon />}
          title={<FormattedMessage id="app.metadata" />}
          toggleOpen={() => this.toggleDrawer("options")}
          open={this.state.expandedDrawer === "options" ? true : false}
        >
          <div className="overpad2-always">
            <Metadata
              draft={this.props.draft}
              display={this.props.display}
              updateDisplay={this.props.updateDisplay}
            />
          </div>
        </Drawer>
        <Drawer
          icon={<ActionIcon />}
          title={<FormattedMessage id="app.actions" />}
          toggleOpen={() => this.toggleDrawer("actions")}
          open={this.state.expandedDrawer === "actions" ? true : false}
        >
          <div className="overpad2-always" />
        </Drawer>
      </React-Fragment>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
