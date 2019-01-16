import React from "react";
import TrayTitle from "../../TrayTitle";
import TrayFooter from "../../TrayFooter";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ArrowDropDown";
import CollapseIcon from "@material-ui/icons/ArrowDropUp";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectedIcon from "@material-ui/icons/Star";
import StarIcon from "@material-ui/icons/StarBorder";
import { patternList } from "@freesewing/patterns";
import { capitalize } from "../../../utils";
import { FormattedMessage } from "react-intl";

class PatternPicker extends React.Component {
  state = {
    extraClasses: "unforced"
  };

  handleCollapse = event => {
    this.setState({ extraClasses: "force-collapsed" });
  };

  handleExpand = event => {
    this.setState({ extraClasses: "force-expanded" });
  };

  setPattern = pattern => {
    this.props.updatePattern(pattern);
    this.setState({ extraClasses: "force-collapsed" });
  };

  render() {
    return (
      <div
        className={
          this.state.extraClasses +
          " mb1 tray shadow1 always-expanded" +
          this.props.className
        }
      >
        <TrayTitle
          icon={
            this.props.selected ? (
              <SelectedIcon className="color-success" />
            ) : (
              <StarIcon />
            )
          }
        >
          {this.props.selected ? (
            <FormattedMessage
              id="app.draftPattern"
              values={{ pattern: capitalize(this.props.selected) }}
            />
          ) : (
            <FormattedMessage id="app.chooseAPattern" />
          )}
          <IconButton className="toggle expand" onClick={this.handleExpand}>
            <ExpandIcon className="toggle" />
          </IconButton>
          <IconButton className="toggle collapse" onClick={this.handleCollapse}>
            <CollapseIcon className="toggle" />
          </IconButton>
        </TrayTitle>
        <div className="content">
          <div className="overpad2-always">
            <List component="nav">
              {patternList.map((pattern, index) => {
                return (
                  <ListItem
                    key={pattern}
                    button
                    onClick={() => this.setPattern(pattern)}
                    className={
                      this.props.selected === pattern
                        ? "option-header selected"
                        : "option-header"
                    }
                  >
                    <ListItemIcon>
                      {this.props.selected === pattern ? (
                        <SelectedIcon className="color-success" />
                      ) : (
                        <StarIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <div className="keyval">
                        <span className="key">{capitalize(pattern)}</span>
                        <span className="val">
                          {
                            <FormattedMessage
                              id={"patterns." + pattern + ".description"}
                              values={{ pattern: capitalize(pattern) }}
                            />
                          }
                        </span>
                      </div>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <TrayFooter>{this.props.footer}</TrayFooter>
        </div>
      </div>
    );
  }
}

PatternPicker.defaultProps = {
  icon: <InfoIcon />,
  footer: "",
  title: ""
};

export default PatternPicker;
