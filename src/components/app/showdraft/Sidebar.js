import React from "react";
import Drawer from "../../Drawer";
import { FormattedMessage } from "react-intl";
import MetadataIcon from "@material-ui/icons/Class";
import ActionIcon from "@material-ui/icons/Directions";
import Metadata from "./Metadata";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import DraftIcon from "@material-ui/icons/Gesture";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

class Sidebar extends React.Component {
  state = {
    expandedDrawer: "actions"
  };

  toggleDrawer = drawer => {
    if (this.state.expandedDrawer === drawer) drawer = "";
    this.setState({ expandedDrawer: drawer });
  };

  render() {
    return (
      <React-Fragment>
        <Drawer
          icon={<ActionIcon />}
          title={<FormattedMessage id="app.actions" />}
          toggleOpen={() => this.toggleDrawer("actions")}
          open={this.state.expandedDrawer === "actions" ? true : false}
          footer={
            <Button variant="text" onClick={this.props.removeDraft}>
              <RemoveIcon className="color-danger mr05" />
              <FormattedMessage id="app.remove" />
            </Button>
          }
        >
          <div className="overpad2-always">
            <ListItem button component="a" onClick={this.props.draftThis}>
              <ListItemIcon>
                <DraftIcon color="primary" />
              </ListItemIcon>
              <ListItemText className="info">
                <FormattedMessage id="app.draft" />
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component="a"
              onClick={() => this.props.updateDisplay("share")}
            >
              <ListItemIcon>
                <ShareIcon color="primary" />
              </ListItemIcon>
              <ListItemText className="info">
                <FormattedMessage id="app.share" />
              </ListItemText>
            </ListItem>
          </div>
        </Drawer>
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
      </React-Fragment>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
