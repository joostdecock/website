import React from "react";
import { connect } from "react-redux";
import { distance, patternOption, locLang } from "../../../../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import ActionIcon from "@material-ui/icons/Directions";
import LayoutIcon from "@material-ui/icons/ViewQuilt";
import SaveIcon from "@material-ui/icons/Save";
import ExportIcon from "@material-ui/icons/ScreenShare";
import HeartIcon from "@material-ui/icons/Favorite";
import ChangeModelIcon from "@material-ui/icons/PermContactCalendar";
import RestoreIcon from "@material-ui/icons/RestorePage";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TuneIcon from "@material-ui/icons/Tune";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { settings as settingsStrings } from "@freesewing/i18n";
import Button from "@material-ui/core/Button";
import Tray from "../../../Tray";
import ModelPicker from "./ModelPicker";
import PatternPicker from "./PatternPicker";

class ActionContainer extends React.Component {
  state = {
    expanded: {}
  };

  listHeading(key, group) {
    return (
      <div>
        <ListItem key={key} button onClick={() => this.toggleGroup(key)}>
          <ListItemIcon>{group.icon}</ListItemIcon>
          <ListItemText inset>
            <h6 className="picker-title">
              <FormattedMessage id={"app." + key} />
            </h6>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="toggle">
              {this.state.expanded[key] ? (
                <CollapseIcon color="primary" />
              ) : (
                <SelectIcon color="primary" />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {this.content(key)}
      </div>
    );
  }

  listItem(key, content) {
    return (
      <Collapse
        in={this.state.expanded[key] === true ? true : false}
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
        content = (
          <ModelPicker
            models={this.getModelList(this.props.pattern)}
            pattern={this.props.pattern}
            language={this.props.language}
            model={this.props.model.handle}
          />
        );
        break;
      case "changePattern":
        content = (
          <PatternPicker
            pattern={this.props.pattern}
            language={this.props.language}
          />
        );
        break;
      case "restoreDefaults":
        content = (
          <ListItem button component="a" onClick={this.props.restoreDefaults}>
            <ListItemIcon>
              <RestoreIcon className="indent2 color-link" />
            </ListItemIcon>
            <ListItemText className="info">
              <FormattedMessage id="app.restoreDefaults" />
            </ListItemText>
          </ListItem>
        );
        break;
      case "startOver":
        content = (
          <div>
            <p>
              <Button
                variant="outlined"
                className="mr1"
                href={locLang.set("/draft", this.props.language)}
              >
                <FormattedMessage id="app.changePattern" />
              </Button>
              <Button
                variant="outlined"
                href={locLang.set(
                  "/draft/" + this.props.pattern,
                  this.props.language
                )}
              >
                <FormattedMessage id="app.changeModel" />
              </Button>
            </p>
          </div>
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
    let expanded = { ...this.state.expanded };
    expanded[key] = !this.state.expanded[key];
    this.setState({ expanded });
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
    console.log("ac props", this.props);
    const groups = {
      layout: {
        icon: <LayoutIcon />
      },
      export: {
        icon: <ExportIcon />
      },
      save: {
        icon: <SaveIcon />
      },
      restoreDefaults: {
        icon: <RestoreIcon />
      },
      changeModel: {
        icon: <ChangeModelIcon />
      },
      changePattern: {
        icon: <ActionIcon />
      }
    };

    return (
      <Tray
        className="mt1"
        icon={<ActionIcon />}
        title={<FormattedMessage id="app.actions" />}
        footer={
          typeof this.props.user.patron !== "undefined" &&
          this.props.user.patron > 1 ? (
            <Button
              size="small"
              component="a"
              href={locLang.set("/patrons", this.props.language)}
            >
              <FormattedMessage id="app.thanksForYourSupport" />
              <HeartIcon className="ml1 color-danger" />
            </Button>
          ) : (
            <Button
              size="small"
              component="a"
              href={locLang.set("/patrons/join", this.props.language)}
            >
              <FormattedMessage id="app.supportFreesewing" />
              :&nbsp;&nbsp;
              <FormattedMessage id="app.becomeAPatron" />
            </Button>
          )
        }
      >
        <div className="overpad2-always">
          <List component="nav">
            {Object.keys(groups).map(key => {
              return this.listHeading(key, groups[key]);
            })}
          </List>
        </div>
      </Tray>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  models: state.models
});

export default connect(mapStateToProps)(ActionContainer);
