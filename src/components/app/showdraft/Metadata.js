import React from "react";
import { FormattedMessage, FormattedRelative } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import NotesIcon from "@material-ui/icons/ChromeReaderMode";
import HandleIcon from "@material-ui/icons/Label";
import TimeIcon from "@material-ui/icons/AccessTime";
import NameIcon from "@material-ui/icons/CreditCard";
import InfoIcon from "@material-ui/icons/Info";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

class Metadata extends React.Component {
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
            <IconButton
              aria-label="toggle"
              onClick={() => this.toggleGroup(key)}
            >
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
      case "metadata":
        content = (
          <React-Fragment>
            <ListItem>
              <ListItemIcon>
                <HandleIcon color="primary" className="indent2" />
              </ListItemIcon>
              <ListItemText className="info">
                <FormattedMessage id="app.handle" />
              </ListItemText>
              <ListItemSecondaryAction className="picker-option-value">
                {this.props.draft.handle}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimeIcon color="primary" className="indent2" />
              </ListItemIcon>
              <ListItemText className="info">
                <FormattedMessage id="app.created" />
              </ListItemText>
              <ListItemSecondaryAction className="picker-option-value">
                <FormattedRelative value={this.props.draft.created} />
              </ListItemSecondaryAction>
            </ListItem>
          </React-Fragment>
        );
        break;
      default:
        content = (
          <React-Fragment>
            {key === "name" ? (
              <ListItem>
                <ListItemIcon>
                  <NameIcon color="primary" className="indent2" />
                </ListItemIcon>
                <ListItemText className="info">
                  <FormattedMessage id={"app." + key} />
                </ListItemText>
                <ListItemSecondaryAction className="picker-option-value">
                  {this.props.draft[key]}
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
              ""
            )}
            <div className="option-wrapper txt-right">
              <Button
                className="mr05"
                variant="outlined"
                onClick={
                  this.props.display === "docs"
                    ? () => this.props.updateDisplay("draft")
                    : () => this.props.updateDisplay("docs", key)
                }
              >
                {this.props.display === "docs" ? (
                  <CloseIcon className="mr05" />
                ) : (
                  ""
                )}
                <FormattedMessage id="app.docs" />
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.props.updateDisplay("update", key)}
              >
                <FormattedMessage id="app.update" />
              </Button>
            </div>
          </React-Fragment>
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
      for (let requiredMeasurement of this.props.patternInfo[pattern]
        .measurements) {
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
      name: {
        icon: <NameIcon color="primary" />
      },
      notes: {
        icon: <NotesIcon color="primary" />
      },
      metadata: {
        icon: <InfoIcon color="primary" />
      }
    };

    return (
      <List component="nav">
        {Object.keys(groups).map(key => {
          return this.listHeading(key, groups[key]);
        })}
      </List>
    );
  }
}

export default Metadata;
