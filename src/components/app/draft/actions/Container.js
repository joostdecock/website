import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import ActionIcon from "@material-ui/icons/Directions";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ExportIcon from "@material-ui/icons/ScreenShare";
import ChangeModelIcon from "@material-ui/icons/PermContactCalendar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import PatternPicker from "./PatternPicker";
import ExportPicker from "./ExportPicker";

class ActionContainer extends React.Component {
  state = {
    expanded: ""
  };

  listHeading(key, group) {
    return (
      <React-Fragment key={"frag-" + key}>
        <ListItem key={key} button onClick={() => this.toggleGroup(key)}>
          <ListItemIcon>{group.icon}</ListItemIcon>
          <ListItemText inset>
            <h6 className="picker-title">
              <FormattedMessage id={"app." + key} />
            </h6>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="toggle">
              {this.state.expanded === key ? (
                <CollapseIcon color="primary" />
              ) : (
                <SelectIcon color="primary" />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {this.content(key)}
      </React-Fragment>
    );
  }

  listItem(key, content) {
    return (
      <Collapse
        in={this.state.expanded === key ? true : false}
        timeout="auto"
        unmountOnExit
        key={"sub-" + key}
      >
        {content}
      </Collapse>
    );
  }

  content(key) {
    let content = "";
    switch (key) {
      case "changeModel":
        let models = this.getModelList(this.props.gist.pattern);
        content = Object.keys(models.valid).map(handle => {
          return (
            <ListItem
              button
              key={handle}
              onClick={() =>
                this.props.updateMeasurements(
                  this.props.models[handle].measurements
                )
              }
            >
              <ListItemIcon>
                <ChangeModelIcon />
              </ListItemIcon>
              <ListItemText>{models.valid[handle]}</ListItemText>
            </ListItem>
          );
        });
        break;
      case "changePattern":
        content = (
          <PatternPicker
            pattern={this.props.gist.pattern}
            language={this.props.language}
          />
        );
        break;
      case "save":
        content = (
          <ListItem button component="a" onClick={this.props.saveDraft}>
            <ListItemIcon>
              <SaveIcon className="indent2" color="primary" />
            </ListItemIcon>
            <ListItemText className="info">
              <FormattedMessage id="app.saveDraftToYourAccount" />
            </ListItemText>
          </ListItem>
        );
        break;
      case "export":
        content = (
          <ExportPicker
            language={this.props.language}
            exportGist={this.props.exportGist}
            exportDraft={this.props.exportDraft}
            setSpinner={this.props.setSpinner}
            patron={this.props.patron}
          />
        );
        break;
      case "reset":
        content = (
          <ListItem button onClick={this.props.clearGist}>
            <ListItemIcon>
              <DeleteIcon className="indent2" color="primary" />
            </ListItemIcon>
            <ListItemText className="info">
              <FormattedMessage id="app.clearGist" />
            </ListItemText>
          </ListItem>
        );
        break;
      default:
        content = (
          <p>Click the button below to save this draft to your account</p>
        );
        break;
    }
    return this.listItem(key, content);
  }

  toggleGroup(key) {
    if (this.state.expanded === key) key = "";
    this.setState({ expanded: key });
  }

  getModelList(pattern) {
    let modelList = {
      valid: {},
      invalid: {}
    };
    for (let handle of Object.keys(this.props.models)) {
      let valid = true;
      for (let requiredMeasurement of this.props.patternInfo[
        this.props.gist.pattern
      ].measurements) {
        if (
          typeof this.props.models[handle].measurements === "undefined" ||
          typeof this.props.models[handle].measurements[requiredMeasurement] ===
            "undefined"
        )
          valid = false;
      }
      if (valid)
        modelList.valid[handle] = this.props.models[handle].name || handle;
      else modelList.invalid[handle] = this.props.models[handle].name || handle;
    }
    return modelList;
  }

  render() {
    const groups = {
      //layout: {
      //  icon: <LayoutIcon color="primary" />
      //},
      export: {
        icon: <ExportIcon color="primary" />
      },
      save: {
        icon: <SaveIcon color="primary" />
      },
      changeModel: {
        icon: <ChangeModelIcon color="primary" />
      },
      changePattern: {
        icon: <ActionIcon color="primary" />
      }
    };
    if (this.props.fromGist)
      groups.reset = { icon: <DeleteIcon color="primary" /> };

    return (
      <List component="nav">
        {Object.keys(groups).map(key => {
          return this.listHeading(key, groups[key]);
        })}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  models: state.models
});

export default connect(mapStateToProps)(ActionContainer);
